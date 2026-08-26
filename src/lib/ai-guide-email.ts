import "server-only";

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character]!,
  );
}

function toCampaignSlug(guideUrl: string) {
  const path = guideUrl.split(/[?#]/)[0]!.replace(/\/+$/, "");
  return path.slice(path.lastIndexOf("/") + 1);
}

function withUtm(url: string, campaign: string) {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}utm_source=email&utm_campaign=${campaign}`;
}

const FONT_STACK =
  "Inter,-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif";

export function buildAiGuideEmail({
  guideTitle,
  guideUrl,
  unsubscribeEmail = "mika@kingscrosslabs.com",
}: {
  guideTitle: string;
  guideUrl: string;
  /** Kept in sync with the send route's replyTo — unsubscribes are handled by
   *  hand from that inbox, so the link is a mailto, not an endpoint. */
  unsubscribeEmail?: string;
}) {
  const campaign = toCampaignSlug(guideUrl);

  const trackedGuideUrl = withUtm(guideUrl, campaign);
  const newsletterUrl = withUtm("http://mikareyes.substack.com/", campaign);
  const agentGuideUrl = withUtm(
    "https://mikareyes.com/build-your-first-agent-101",
    campaign,
  );

  const unsubscribeMailto = escapeHtml(
    `mailto:${unsubscribeEmail}?subject=Unsubscribe`,
  );

  const safeGuideTitle = escapeHtml(guideTitle);
  const safeGuideUrl = escapeHtml(trackedGuideUrl);

  return {
    subject: `Mika's Guide: ${guideTitle}`,
    text: `You requested an email for the guide:\n\n${guideTitle}\n\nRead the guide: ${trackedGuideUrl}\n\nOther resources:\n\n- My newsletter! ${newsletterUrl} - I go deeper in using AI for a Time Rich Life\n- Master Agentic AI 101: ${agentGuideUrl} - build your 1st agent\n\nIf you have any other questions, just let me know! ✨\n\nMika Reyes\nFounder & CEO\n\nhttps://mikareyes.com\n\nYou received this email because you requested this guide on mikareyes.com.\nUnsubscribe: mailto:${unsubscribeEmail}?subject=Unsubscribe`,
    html: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Your guide from Mika Reyes</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
    </style>
  </head>
  <body style="margin:0;padding:0;background:#F7F4EF;color:#111111;">
    <div style="max-width:560px;margin:0 auto;padding:40px 20px;font-family:${FONT_STACK};">
      <div style="overflow:hidden;border:1px solid #E4E0D8;border-radius:18px;background:#FFFFFF;">
        <div style="background:#0E8C8C;padding:20px 32px;">
          <p style="margin:0;font-family:${FONT_STACK};font-size:26px;font-weight:400;line-height:1.1;letter-spacing:-.03em;color:#FFFFFF;"><span style="font-weight:700;">Mika Reyes</span> &middot; Time Rich AI</p>
        </div>
        <div style="padding:32px;">
          <p style="margin:0 0 6px;font-size:16px;font-weight:400;line-height:1.5;color:#3A3A3A;">You requested an email for the guide:</p>
          <p style="margin:0 0 24px;font-size:20px;font-weight:700;line-height:1.4;color:#111111;">${safeGuideTitle}</p>
          <a href="${safeGuideUrl}" style="display:inline-block;border-radius:100px;background:#E8425A;padding:14px 22px;font-family:${FONT_STACK};font-size:16px;font-weight:600;line-height:1.2;color:#FFFFFF;text-decoration:none;">Read the guide</a>
          <p style="margin:32px 0 10px;font-size:15px;font-weight:600;line-height:1.6;color:#111111;">Other resources:</p>
          <ul style="margin:0 0 18px;padding-left:20px;font-size:15px;line-height:1.6;color:#3A3A3A;">
            <li style="margin:0 0 8px;"><a href="${newsletterUrl.replace(/&/g, "&amp;")}" style="color:#E8425A;font-weight:600;text-decoration:underline;">My newsletter!</a> - I go deeper in using AI for a Time Rich Life</li>
            <li style="margin:0;"><a href="${agentGuideUrl.replace(/&/g, "&amp;")}" style="color:#E8425A;font-weight:600;text-decoration:underline;">Master Agentic AI 101</a> - build your 1st agent</li>
          </ul>
          <p style="margin:24px 0 18px;font-size:15px;line-height:1.6;color:#3A3A3A;">If you have any other questions, just let me know! &#10024;</p>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="padding-right:14px;vertical-align:middle;">
                <img src="https://mikareyes.com/mika-reyes-author.jpg" width="56" height="56" alt="Mika Reyes" style="display:block;width:56px;height:56px;border-radius:50%;object-fit:cover;" />
              </td>
              <td style="vertical-align:middle;">
                <p style="margin:0 0 4px;font-family:${FONT_STACK};font-size:15px;font-weight:600;line-height:1.5;color:#111111;">Mika Reyes</p>
                <p style="margin:0;font-family:${FONT_STACK};font-size:13px;font-weight:600;line-height:1.5;color:#E8425A;">Founder &amp; CEO</p>
              </td>
            </tr>
          </table>
        </div>
        <div style="border-top:1px solid #E4E0D8;background:#FBFAF8;padding:22px 32px;">
          <p style="margin:0 0 7px;font-family:${FONT_STACK};font-size:13px;line-height:1.6;color:#6B6B6B;">Mika Reyes · <a href="https://mikareyes.com" style="color:#6B6B6B;">mikareyes.com</a></p>
          <p style="margin:0 0 7px;font-family:${FONT_STACK};font-size:12px;line-height:1.6;color:#8A8580;">You received this email because you requested this guide on mikareyes.com. <a href="${unsubscribeMailto}" style="color:#8A8580;text-decoration:underline;">Unsubscribe</a></p>
          <p style="margin:0;font-family:${FONT_STACK};font-size:12px;line-height:1.6;color:#8A8580;">© ${new Date().getFullYear()} Mika Reyes.</p>
        </div>
      </div>
    </div>
  </body>
</html>`,
  };
}
