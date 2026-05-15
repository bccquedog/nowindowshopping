# Raffle Module Setup

## Environment Variables

Add these to your Vercel project (or `.env.local` for local development):

| Variable | Description |
|----------|-------------|
| `STRIPE_SECRET_KEY` | Stripe secret key (sk_live_... or sk_test_...) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret (whsec_...) |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (pk_...) - for client if needed |
| `FIREBASE_PROJECT_ID` | Firebase project ID (e.g. nws-card-suite) |
| `CRON_SECRET` | Optional. If set, the process-ended API requires `Authorization: Bearer <CRON_SECRET>` |
| `GOOGLE_APPLICATION_CREDENTIALS` | Path to Firebase service account JSON (for local dev) |

## Stripe Webhook

1. Create a webhook in Stripe Dashboard: https://dashboard.stripe.com/webhooks
2. Endpoint URL: `https://your-domain.com/api/stripe/webhook`
3. Events to listen for:
   - `checkout.session.completed`
   - `charge.refunded`
   - `charge.dispute.created`
4. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

## Firebase

1. Deploy Firestore rules: `firebase deploy --only firestore:rules`
2. Deploy Firestore indexes: `firebase deploy --only firestore:indexes`
3. For serverless (API routes), use a Firebase service account. In Vercel, add the JSON as an env var or use Application Default Credentials.

## Cron (Winner Selection)

Vercel Cron runs `/api/raffle/process-ended` every 15 minutes. Requires Vercel Pro for cron jobs. Alternatively, use an external cron service (e.g. cron-job.org) to hit the endpoint.

If `CRON_SECRET` is set, include it: `Authorization: Bearer <your-secret>`
