const RESEND_API_URL = "https://api.resend.com/emails";

export const sendVerificationEmail = async (
  email: string,
  code: string
): Promise<{ success: boolean; error?: string }> => {
  const apiKey = process.env.EXPO_PUBLIC_RESEND_API_KEY;

  if (!apiKey) {
    console.warn("[EMAIL] EXPO_PUBLIC_RESEND_API_KEY is not set — skipping email send");
    return {
      success: false,
      error: "Failed to send verification email. Please try again.",
    };
  }

  try {
    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Nimbus <onboarding@resend.dev>",
        to: [email],
        subject: "Your Nimbus Verification Code",
        text: `Your verification code is: ${code}`,
      }),
    });

    if (!response.ok) {
      console.error(`[EMAIL] Resend API error: ${response.status} ${response.statusText}`);
      return {
        success: false,
        error: "Failed to send verification email. Please try again.",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("[EMAIL] Failed to send verification email:", error);
    return {
      success: false,
      error: "Failed to send verification email. Please try again.",
    };
  }
};
