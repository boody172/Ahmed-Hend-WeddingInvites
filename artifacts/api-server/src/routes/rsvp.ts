import { Router, type IRouter } from "express";
import { SubmitRsvpBody } from "@workspace/api-zod";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

const router: IRouter = Router();
const RSVP_RECIPIENT = "boody172@gmail.com";

type Rsvp = typeof SubmitRsvpBody._output;

async function saveFallback(rsvp: Rsvp): Promise<void> {
  const dataDirectory = path.resolve(process.cwd(), "data");
  await mkdir(dataDirectory, { recursive: true });
  await appendFile(
    path.join(dataDirectory, "rsvps.jsonl"),
    `${JSON.stringify({ ...rsvp, receivedAt: new Date().toISOString() })}\n`,
    "utf8",
  );
}

async function sendEmail(rsvp: Rsvp, apiKey: string): Promise<void> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:
        process.env["RSVP_FROM_EMAIL"] ??
        "Ahmed & Hend Wedding <onboarding@resend.dev>",
      to: [RSVP_RECIPIENT],
      subject: `Wedding RSVP: ${rsvp.fullName} — ${rsvp.attendance}`,
      text: [
        `Name: ${rsvp.fullName}`,
        `Guests: ${rsvp.guestCount}`,
        `Attendance: ${rsvp.attendance}`,
        `Contact: ${rsvp.contact}`,
        `Message: ${rsvp.message || "No message provided"}`,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend returned HTTP ${response.status}`);
  }
}

router.post("/rsvp", async (req, res) => {
  const parsed = SubmitRsvpBody.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: "Please check the RSVP details and try again." });
    return;
  }

  const rsvp = parsed.data;
  const resendApiKey = process.env["RESEND_API_KEY"];

  try {
    if (resendApiKey) {
      await sendEmail(rsvp, resendApiKey);
    } else {
      await saveFallback(rsvp);
    }
  } catch (error) {
    req.log.error({ err: error }, "RSVP email delivery failed; saving fallback");
    await saveFallback(rsvp);
  }

  req.log.info(
    { attendance: rsvp.attendance, guestCount: rsvp.guestCount },
    "Wedding RSVP received",
  );

  res.status(201).json({
    received: true,
    fullName: rsvp.fullName,
    attendance: rsvp.attendance,
  });
});

export default router;
