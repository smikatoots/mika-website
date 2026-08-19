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

export function buildAiGuideEmail({
  guideTitle,
  guideUrl,
}: {
  guideTitle: string;
  guideUrl: string;
}) {
  const safeGuideTitle = escapeHtml(guideTitle);
  const safeGuideUrl = escapeHtml(guideUrl);

  return {
    subject: `Your guide: ${guideTitle}`,
    text: `Here's your guide!\n\n${guideTitle}\n\nRead the article: ${guideUrl}\n\nIf you have any questions, let me know.\n\nMika Reyes\nFounder & CEO\n\nhttps://mikareyes.com\n\nYou received this email because you requested this guide on mikareyes.com.`,
    html: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Your guide from Mika Reyes</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@700&family=Hanken+Grotesk:wght@400;600;700&display=swap');
    </style>
  </head>
  <body style="margin:0;padding:0;background:#F7F4EF;color:#111111;">
    <div style="max-width:560px;margin:0 auto;padding:40px 20px;font-family:'Hanken Grotesk','Helvetica Neue',Arial,sans-serif;">
      <div style="overflow:hidden;border:1px solid #E4E0D8;border-radius:18px;background:#FFFFFF;">
        <div style="border-bottom:1px solid #F6D2D7;background:#FCEAEC;padding:20px 32px;">
          <p style="margin:0;font-family:'Bricolage Grotesque','Trebuchet MS',Arial,sans-serif;font-size:28px;font-weight:700;line-height:1;letter-spacing:-.03em;color:#111111;">Mika Reyes</p>
        </div>
        <div style="padding:32px;">
          <h1 style="margin:0 0 14px;font-family:'Bricolage Grotesque','Trebuchet MS',Arial,sans-serif;font-size:30px;line-height:1.2;letter-spacing:-.02em;color:#111111;">Here&apos;s your guide!</h1>
          <p style="margin:0 0 24px;font-size:18px;font-weight:600;line-height:1.5;color:#3A3A3A;">${safeGuideTitle}</p>
          <a href="${safeGuideUrl}" style="display:inline-block;border-radius:100px;background:#E8425A;padding:14px 22px;font-size:16px;font-weight:600;line-height:1.2;color:#FFFFFF;text-decoration:none;">Read the article &nbsp;→</a>
          <p style="margin:30px 0 18px;font-size:15px;line-height:1.6;color:#3A3A3A;">If you have any questions, let me know.</p>
          <table role="presentation" cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td style="padding-right:14px;vertical-align:middle;">
                <img src="https://mikareyes.com/mika-reyes-author.jpg" width="56" height="56" alt="Mika Reyes" style="display:block;width:56px;height:56px;border-radius:50%;object-fit:cover;" />
              </td>
              <td style="vertical-align:middle;">
                <p style="margin:0 0 4px;font-size:15px;font-weight:600;line-height:1.5;color:#111111;">Mika Reyes</p>
                <p style="margin:0;font-size:13px;font-weight:600;line-height:1.5;color:#E8425A;">Founder &amp; CEO</p>
              </td>
            </tr>
          </table>
        </div>
        <div style="border-top:1px solid #E4E0D8;background:#FBFAF8;padding:22px 32px;">
          <p style="margin:0 0 7px;font-size:13px;line-height:1.6;color:#6B6B6B;">Mika Reyes · <a href="https://mikareyes.com" style="color:#6B6B6B;">mikareyes.com</a></p>
          <p style="margin:0;font-size:12px;line-height:1.6;color:#8A8580;">You received this email because you requested this guide on mikareyes.com. © ${new Date().getFullYear()} Mika Reyes.</p>
        </div>
      </div>
    </div>
  </body>
</html>`,
  };
}
