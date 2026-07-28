import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

type ContactNotificationEmailProps = {
  name: string;
  phone: string;
  email?: string;
  practiceArea?: string;
  message: string;
};

const colors = {
  ink: "#1f2a33",
  cream: "#f8f5f0",
  card: "#fdfbf8",
  border: "#e0dad1",
  muted: "#5c6b7a",
  brand: "#3a6b6b",
};

export function ContactNotificationEmail({
  name,
  phone,
  email,
  practiceArea,
  message,
}: ContactNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>New consultation request from {name}</Preview>
      <Body
        style={{
          backgroundColor: colors.cream,
          fontFamily:
            "Georgia, 'Times New Roman', serif, -apple-system, sans-serif",
          margin: 0,
          padding: "32px 16px",
        }}
      >
        <Container
          style={{
            maxWidth: 520,
            margin: "0 auto",
            backgroundColor: colors.card,
            border: `1px solid ${colors.border}`,
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <Section
            style={{
              backgroundColor: colors.ink,
              padding: "24px 32px",
            }}
          >
            <Text
              style={{
                color: colors.cream,
                fontSize: 12,
                letterSpacing: 1,
                textTransform: "uppercase",
                margin: 0,
                opacity: 0.7,
              }}
            >
              Megastar Law Associates
            </Text>
            <Heading
              style={{
                color: colors.cream,
                fontSize: 20,
                margin: "4px 0 0",
                fontWeight: 500,
              }}
            >
              New consultation request
            </Heading>
          </Section>

          <Section style={{ padding: "28px 32px 8px" }}>
            <Text
              style={{
                fontSize: 14,
                color: colors.muted,
                margin: "0 0 20px",
              }}
            >
              Someone reached out through the website contact form. This
              lead has also been added to the CRM pipeline automatically.
            </Text>

            <Row>
              <Column style={{ paddingBottom: 12 }}>
                <Text
                  style={{
                    fontSize: 11,
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                    color: colors.muted,
                    margin: 0,
                  }}
                >
                  Name
                </Text>
                <Text style={{ fontSize: 15, color: colors.ink, margin: "2px 0 0" }}>
                  {name}
                </Text>
              </Column>
            </Row>

            <Row>
              <Column style={{ width: "50%", paddingBottom: 12 }}>
                <Text
                  style={{
                    fontSize: 11,
                    letterSpacing: 0.5,
                    textTransform: "uppercase",
                    color: colors.muted,
                    margin: 0,
                  }}
                >
                  Phone
                </Text>
                <Text style={{ fontSize: 15, color: colors.ink, margin: "2px 0 0" }}>
                  {phone}
                </Text>
              </Column>
              {email && (
                <Column style={{ width: "50%", paddingBottom: 12 }}>
                  <Text
                    style={{
                      fontSize: 11,
                      letterSpacing: 0.5,
                      textTransform: "uppercase",
                      color: colors.muted,
                      margin: 0,
                    }}
                  >
                    Email
                  </Text>
                  <Text style={{ fontSize: 15, color: colors.ink, margin: "2px 0 0" }}>
                    {email}
                  </Text>
                </Column>
              )}
            </Row>

            {practiceArea && (
              <Row>
                <Column style={{ paddingBottom: 12 }}>
                  <Text
                    style={{
                      fontSize: 11,
                      letterSpacing: 0.5,
                      textTransform: "uppercase",
                      color: colors.muted,
                      margin: 0,
                    }}
                  >
                    Practice Area
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: colors.brand,
                      margin: "2px 0 0",
                      fontWeight: 600,
                    }}
                  >
                    {practiceArea}
                  </Text>
                </Column>
              </Row>
            )}

            <Hr style={{ borderColor: colors.border, margin: "16px 0" }} />

            <Text
              style={{
                fontSize: 11,
                letterSpacing: 0.5,
                textTransform: "uppercase",
                color: colors.muted,
                margin: "0 0 6px",
              }}
            >
              Message
            </Text>
            <Text
              style={{
                fontSize: 15,
                color: colors.ink,
                lineHeight: 1.6,
                margin: 0,
                whiteSpace: "pre-wrap",
              }}
            >
              {message}
            </Text>
          </Section>

          <Section style={{ padding: "16px 32px 28px" }}>
            <Hr style={{ borderColor: colors.border, margin: "0 0 16px" }} />
            <Text style={{ fontSize: 12, color: colors.muted, margin: 0 }}>
              Reply directly to this email to respond to {name}, or open the
              lead in the CRM to update its stage.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default ContactNotificationEmail;
