# CoachCare Email Templates

This document provides comprehensive documentation for the CoachCare email template system, including setup, usage, customization, and best practices.

## Overview

The CoachCare email template system provides a comprehensive set of pre-built email templates for various coaching scenarios. The system includes:

- **18 different email templates** covering onboarding, sessions, goals, notifications, security, billing, and feedback
- **Responsive HTML and plain text versions** of each template
- **Template variable system** for dynamic content
- **Template management interface** for admins
- **Test email functionality** for previewing templates

## Template Categories

### 1. Onboarding Templates
- `welcome-client` - Welcome email for new clients
- `welcome-coach` - Welcome email for new coaches
- `account-created` - Notification when account is created by admin
- `coaching-invitation` - Invitation to join CoachCare

### 2. Session Templates
- `session-reminder` - 24-hour reminder before sessions
- `session-confirmation` - Confirmation when session is scheduled
- `session-cancelled` - Notification when session is cancelled
- `session-rescheduled` - Notification when session is rescheduled

### 3. Goal Templates
- `goal-deadline` - Reminder when goal deadline approaches
- `goal-completed` - Celebration when goal is achieved
- `goal-update` - Notification when goal is updated

### 4. Notification Templates
- `assessment-reminder` - Reminder for pending assessments
- `progress-report` - Monthly progress report
- `monthly-report` - Monthly coaching report

### 5. Security Templates
- `password-reset` - Password reset email with secure link

### 6. Billing Templates
- `payment-received` - Payment confirmation
- `payment-due` - Payment reminder

### 7. Feedback Templates
- `feedback-request` - Request for feedback after session

## Template Structure

Each email template consists of:

```typescript
interface EmailTemplateConfig {
  subject: string;           // Email subject line
  html: string;             // HTML version of the email
  text: string;             // Plain text version
  category: string;         // Template category
  description: string;      // Human-readable description
}
```

## Template Variables

Templates use a variable substitution system with `{{variableName}}` syntax. Common variables include:

### User Variables
- `{{clientName}}` - Client's full name
- `{{coachName}}` - Coach's full name
- `{{userName}}` - User's name (for generic templates)
- `{{email}}` - User's email address

### Session Variables
- `{{sessionTitle}}` - Session title
- `{{sessionDate}}` - Session date
- `{{sessionTime}}` - Session time
- `{{sessionDuration}}` - Session duration
- `{{sessionFocus}}` - Session focus area
- `{{sessionLocation}}` - Session location
- `{{sessionDescription}}` - Session description
- `{{sessionUrl}}` - Link to session details

### Goal Variables
- `{{goalTitle}}` - Goal title
- `{{goalDescription}}` - Goal description
- `{{goalDeadline}}` - Goal deadline
- `{{goalProgress}}` - Goal progress percentage
- `{{daysRemaining}}` - Days until deadline
- `{{progressMessage}}` - Progress status message
- `{{goalUrl}}` - Link to goal details
- `{{completionDate}}` - Goal completion date
- `{{achievementMessage}}` - Achievement celebration message

### URL Variables
- `{{dashboardUrl}}` - Link to dashboard
- `{{gettingStartedUrl}}` - Getting started guide
- `{{faqUrl}}` - FAQ page
- `{{supportUrl}}` - Support contact
- `{{resetUrl}}` - Password reset link

## Usage

### Basic Email Sending

```typescript
import { emailService } from './emailService';

// Send a welcome email
const result = await emailService.sendWelcomeEmail(client, coach);

// Send a session reminder
const result = await emailService.sendSessionReminder(session, client, coach);

// Send a goal deadline reminder
const result = await emailService.sendGoalDeadlineReminder(goal, client, coach);
```

### Custom Email Sending

```typescript
import { emailService } from './emailService';

const result = await emailService.sendEmail({
  to: 'client@example.com',
  toName: 'John Smith',
  from: 'noreply@coachcare.com',
  fromName: 'CoachCare',
  template: 'welcome-client',
  data: {
    clientName: 'John Smith',
    coachName: 'Sarah Johnson',
    dashboardUrl: 'https://coachcare.com/dashboard',
    // ... other variables
  }
});
```

### Template Management

```typescript
import { emailTemplates, getTemplatesByCategory } from './emailTemplates';

// Get all templates
const allTemplates = emailTemplates;

// Get templates by category
const sessionTemplates = getTemplatesByCategory('sessions');

// Validate template variables
const validation = validateTemplateVariables(template.html, providedVariables);
```

## Customization

### Adding New Templates

1. **Define the template** in `emailTemplates.ts`:

```typescript
'new-template': {
  category: 'notifications',
  description: 'Description of the new template',
  subject: 'Subject: {{variable}}',
  html: `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Template</title>
      <style>
        /* Your CSS styles */
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Hello {{clientName}}</h1>
        <p>{{message}}</p>
      </div>
    </body>
    </html>
  `,
  text: `
Hello {{clientName}},

{{message}}

Best regards,
CoachCare Team
  `
}
```

2. **Add the template type** to `EmailTemplateType` in `emailService.ts`:

```typescript
export type EmailTemplateType = 
  | 'existing-templates'
  | 'new-template';  // Add this line
```

3. **Add the template method** in `EmailService` class:

```typescript
private getNewTemplateTemplate(): EmailTemplate {
  return emailTemplates['new-template'];
}
```

4. **Add to the switch statement** in `getEmailTemplate` method:

```typescript
case 'new-template':
  return this.getNewTemplateTemplate();
```

### Modifying Existing Templates

1. **Edit the template** in `emailTemplates.ts`
2. **Test the changes** using the template manager
3. **Send a test email** to verify the template works correctly

### Template Styling

All templates use inline CSS for maximum email client compatibility. The base styling includes:

- Responsive design with max-width container
- Gradient headers
- Consistent button styling
- Dark mode support
- Mobile-friendly layout

## Email Service Integration

### Production Setup

In production, replace the mock email service with a real email provider:

```typescript
// Example with SendGrid
import sgMail from '@sendgrid/mail';

class EmailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendEmail(emailData: EmailData): Promise<{ success: boolean; message: string }> {
    try {
      const template = this.getEmailTemplate(emailData.template);
      const processedTemplate = this.processTemplate(template, emailData.data);

      const msg = {
        to: emailData.to,
        from: emailData.from,
        subject: processedTemplate.subject,
        html: processedTemplate.html,
        text: processedTemplate.text,
      };

      await sgMail.send(msg);
      return { success: true, message: 'Email sent successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to send email' };
    }
  }
}
```

### Environment Variables

Set up the following environment variables:

```env
REACT_APP_BASE_URL=https://coachcare.com
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=noreply@coachcare.com
EMAIL_FROM_NAME=CoachCare
```

## Template Manager

The Email Template Manager provides a web interface for:

- **Viewing all templates** with search and filtering
- **Previewing templates** with sample data
- **Editing template content** and styling
- **Sending test emails** to verify templates
- **Exporting templates** for backup
- **Copying templates** to clipboard

### Accessing the Template Manager

The template manager is available in the admin portal:

```typescript
import { EmailTemplateManager } from './components/EmailTemplateManager';

// In your admin component
<EmailTemplateManager onClose={() => setShowTemplateManager(false)} />
```

## Best Practices

### Template Design

1. **Keep it simple** - Avoid complex layouts that may not render correctly
2. **Use inline CSS** - External stylesheets are often blocked
3. **Test across email clients** - Gmail, Outlook, Apple Mail, etc.
4. **Include plain text version** - For accessibility and fallback
5. **Use web-safe fonts** - Arial, Helvetica, Times New Roman

### Content Guidelines

1. **Clear subject lines** - Be specific and actionable
2. **Personalized content** - Use recipient's name and relevant details
3. **Clear call-to-action** - Make it obvious what the recipient should do
4. **Professional tone** - Maintain brand voice and professionalism
5. **Mobile-friendly** - Ensure readability on mobile devices

### Variable Usage

1. **Always provide fallbacks** - Handle missing variables gracefully
2. **Validate variables** - Check that required variables are provided
3. **Use descriptive names** - Make variable names self-explanatory
4. **Document variables** - Keep a list of available variables for each template

### Testing

1. **Send test emails** - Always test before sending to real users
2. **Check rendering** - Verify templates look correct in different email clients
3. **Validate links** - Ensure all links work correctly
4. **Test variables** - Verify variable substitution works as expected

## Troubleshooting

### Common Issues

1. **Template not found** - Check template name spelling and case
2. **Variables not replaced** - Verify variable names match exactly
3. **Styling issues** - Use inline CSS and test in multiple email clients
4. **Links not working** - Ensure URLs are properly formatted

### Debug Mode

Enable debug logging to troubleshoot issues:

```typescript
// In emailService.ts
console.log('Template data:', emailData);
console.log('Processed template:', processedTemplate);
```

## Security Considerations

1. **Validate input** - Sanitize user-provided content
2. **Use HTTPS** - Ensure all links use secure protocols
3. **Rate limiting** - Implement email sending rate limits
4. **Authentication** - Verify user permissions before sending emails
5. **Data privacy** - Follow GDPR and other privacy regulations

## Support

For questions or issues with the email template system:

1. Check this documentation
2. Review the template examples
3. Test with the template manager
4. Contact the development team

## Changelog

### Version 1.0.0
- Initial release with 18 email templates
- Template management interface
- Variable substitution system
- Test email functionality
- Responsive design support



