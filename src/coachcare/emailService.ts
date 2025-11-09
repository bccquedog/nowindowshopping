import { User, Client, Session, Goal } from './types';

// Email template types
export type EmailTemplateType = 
  | 'welcome-client'
  | 'welcome-coach'
  | 'session-reminder'
  | 'session-confirmation'
  | 'session-cancelled'
  | 'session-rescheduled'
  | 'goal-deadline'
  | 'goal-completed'
  | 'goal-update'
  | 'assessment-reminder'
  | 'progress-report'
  | 'password-reset'
  | 'account-created'
  | 'payment-received'
  | 'payment-due'
  | 'coaching-invitation'
  | 'feedback-request'
  | 'monthly-report';

// Email template interface
export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

// Email data interface
export interface EmailData {
  to: string;
  toName: string;
  from: string;
  fromName: string;
  template: EmailTemplateType;
  data: Record<string, any>;
  attachments?: Array<{
    filename: string;
    content: string;
    contentType: string;
  }>;
}

// Email service class
class EmailService {
  private readonly defaultFrom = 'noreply@coachcare.com';
  private readonly defaultFromName = 'CoachCare';

  // Send email (mock implementation - in production, this would use a real email service)
  async sendEmail(emailData: EmailData): Promise<{ success: boolean; message: string }> {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const template = this.getEmailTemplate(emailData.template);
      const processedTemplate = this.processTemplate(template, emailData.data);

      console.log('Email sent:', {
        to: emailData.to,
        subject: processedTemplate.subject,
        template: emailData.template
      });

      return {
        success: true,
        message: 'Email sent successfully'
      };
    } catch (error) {
      console.error('Email sending failed:', error);
      return {
        success: false,
        message: 'Failed to send email'
      };
    }
  }

  // Get email template by type
  private getEmailTemplate(type: EmailTemplateType): EmailTemplate {
    switch (type) {
      case 'welcome-client':
        return this.getWelcomeClientTemplate();
      case 'welcome-coach':
        return this.getWelcomeCoachTemplate();
      case 'session-reminder':
        return this.getSessionReminderTemplate();
      case 'session-confirmation':
        return this.getSessionConfirmationTemplate();
      case 'session-cancelled':
        return this.getSessionCancelledTemplate();
      case 'session-rescheduled':
        return this.getSessionRescheduledTemplate();
      case 'goal-deadline':
        return this.getGoalDeadlineTemplate();
      case 'goal-completed':
        return this.getGoalCompletedTemplate();
      case 'goal-update':
        return this.getGoalUpdateTemplate();
      case 'assessment-reminder':
        return this.getAssessmentReminderTemplate();
      case 'progress-report':
        return this.getProgressReportTemplate();
      case 'password-reset':
        return this.getPasswordResetTemplate();
      case 'account-created':
        return this.getAccountCreatedTemplate();
      case 'payment-received':
        return this.getPaymentReceivedTemplate();
      case 'payment-due':
        return this.getPaymentDueTemplate();
      case 'coaching-invitation':
        return this.getCoachingInvitationTemplate();
      case 'feedback-request':
        return this.getFeedbackRequestTemplate();
      case 'monthly-report':
        return this.getMonthlyReportTemplate();
      default:
        throw new Error(`Unknown email template type: ${type}`);
    }
  }

  // Process template with data
  private processTemplate(template: EmailTemplate, data: Record<string, any>): EmailTemplate {
    const processString = (str: string): string => {
      return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        return data[key] || match;
      });
    };

    return {
      subject: processString(template.subject),
      html: processString(template.html),
      text: processString(template.text)
    };
  }

  // Template methods
  private getWelcomeClientTemplate(): EmailTemplate {
    return {
      subject: 'Welcome to CoachCare - Your Coaching Journey Begins!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to CoachCare</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to CoachCare!</h1>
              <p>Your journey to personal and professional growth starts now</p>
            </div>
            <div class="content">
              <h2>Hi {{clientName}},</h2>
              <p>Welcome to CoachCare! We're excited to have you on board and can't wait to support you on your coaching journey.</p>
              
              <h3>What's Next?</h3>
              <ul>
                <li><strong>Complete Your Profile:</strong> Add your goals, preferences, and background information</li>
                <li><strong>Schedule Your First Session:</strong> Book a discovery call with your coach</li>
                <li><strong>Explore Your Dashboard:</strong> Get familiar with your personalized coaching portal</li>
              </ul>

              <p>Your coach, <strong>{{coachName}}</strong>, is looking forward to working with you and helping you achieve your goals.</p>

              <a href="{{dashboardUrl}}" class="button">Access Your Dashboard</a>

              <h3>Getting Started Resources</h3>
              <ul>
                <li><a href="{{gettingStartedUrl}}">Getting Started Guide</a></li>
                <li><a href="{{faqUrl}}">Frequently Asked Questions</a></li>
                <li><a href="{{supportUrl}}">Contact Support</a></li>
              </ul>

              <p>If you have any questions or need assistance, don't hesitate to reach out to our support team.</p>

              <p>Best regards,<br>The CoachCare Team</p>
            </div>
            <div class="footer">
              <p>© 2024 CoachCare. All rights reserved.</p>
              <p>This email was sent to {{email}}. If you didn't sign up for CoachCare, please ignore this email.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Welcome to CoachCare!

Hi {{clientName}},

Welcome to CoachCare! We're excited to have you on board and can't wait to support you on your coaching journey.

What's Next?
- Complete Your Profile: Add your goals, preferences, and background information
- Schedule Your First Session: Book a discovery call with your coach
- Explore Your Dashboard: Get familiar with your personalized coaching portal

Your coach, {{coachName}}, is looking forward to working with you and helping you achieve your goals.

Access Your Dashboard: {{dashboardUrl}}

Getting Started Resources:
- Getting Started Guide: {{gettingStartedUrl}}
- Frequently Asked Questions: {{faqUrl}}
- Contact Support: {{supportUrl}}

If you have any questions or need assistance, don't hesitate to reach out to our support team.

Best regards,
The CoachCare Team

© 2024 CoachCare. All rights reserved.
This email was sent to {{email}}. If you didn't sign up for CoachCare, please ignore this email.
      `
    };
  }

  private getWelcomeCoachTemplate(): EmailTemplate {
    return {
      subject: 'Welcome to CoachCare - Your Coaching Platform is Ready!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to CoachCare</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to CoachCare!</h1>
              <p>Your professional coaching platform is ready</p>
            </div>
            <div class="content">
              <h2>Hi {{coachName}},</h2>
              <p>Welcome to CoachCare! Your coaching platform is now set up and ready to help you deliver exceptional coaching experiences to your clients.</p>
              
              <h3>Platform Features</h3>
              <ul>
                <li><strong>Client Management:</strong> Organize and track all your clients in one place</li>
                <li><strong>Session Scheduling:</strong> Easy scheduling with calendar integration</li>
                <li><strong>Progress Tracking:</strong> Monitor client goals and achievements</li>
                <li><strong>Communication Tools:</strong> Stay connected with your clients</li>
                <li><strong>Analytics Dashboard:</strong> Track your coaching business metrics</li>
              </ul>

              <a href="{{dashboardUrl}}" class="button">Access Your Dashboard</a>

              <h3>Getting Started</h3>
              <ul>
                <li><a href="{{profileSetupUrl}}">Complete Your Profile</a></li>
                <li><a href="{{clientOnboardingUrl}}">Client Onboarding Guide</a></li>
                <li><a href="{{platformGuideUrl}}">Platform User Guide</a></li>
                <li><a href="{{supportUrl}}">Technical Support</a></li>
              </ul>

              <p>We're here to support you every step of the way. If you need any assistance, our support team is ready to help.</p>

              <p>Best regards,<br>The CoachCare Team</p>
            </div>
            <div class="footer">
              <p>© 2024 CoachCare. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Welcome to CoachCare!

Hi {{coachName}},

Welcome to CoachCare! Your coaching platform is now set up and ready to help you deliver exceptional coaching experiences to your clients.

Platform Features:
- Client Management: Organize and track all your clients in one place
- Session Scheduling: Easy scheduling with calendar integration
- Progress Tracking: Monitor client goals and achievements
- Communication Tools: Stay connected with your clients
- Analytics Dashboard: Track your coaching business metrics

Access Your Dashboard: {{dashboardUrl}}

Getting Started:
- Complete Your Profile: {{profileSetupUrl}}
- Client Onboarding Guide: {{clientOnboardingUrl}}
- Platform User Guide: {{platformGuideUrl}}
- Technical Support: {{supportUrl}}

We're here to support you every step of the way. If you need any assistance, our support team is ready to help.

Best regards,
The CoachCare Team

© 2024 CoachCare. All rights reserved.
      `
    };
  }

  private getSessionReminderTemplate(): EmailTemplate {
    return {
      subject: 'Reminder: Your Coaching Session Tomorrow at {{sessionTime}}',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Session Reminder</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .session-info { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #667eea; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Session Reminder</h1>
              <p>Your coaching session is tomorrow</p>
            </div>
            <div class="content">
              <h2>Hi {{clientName}},</h2>
              <p>This is a friendly reminder about your upcoming coaching session.</p>
              
              <div class="session-info">
                <h3>Session Details</h3>
                <p><strong>Date:</strong> {{sessionDate}}</p>
                <p><strong>Time:</strong> {{sessionTime}}</p>
                <p><strong>Duration:</strong> {{sessionDuration}}</p>
                <p><strong>Coach:</strong> {{coachName}}</p>
                <p><strong>Focus Area:</strong> {{sessionFocus}}</p>
              </div>

              <h3>Preparation Tips</h3>
              <ul>
                <li>Review your goals and progress since the last session</li>
                <li>Prepare any questions or challenges you'd like to discuss</li>
                <li>Find a quiet, comfortable space for the session</li>
                <li>Test your video/audio connection if it's a virtual session</li>
              </ul>

              <a href="{{sessionUrl}}" class="button">Join Session</a>

              <p>If you need to reschedule or cancel, please contact your coach as soon as possible.</p>

              <p>Looking forward to our session!<br>{{coachName}}</p>
            </div>
            <div class="footer">
              <p>© 2024 CoachCare. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Session Reminder

Hi {{clientName}},

This is a friendly reminder about your upcoming coaching session.

Session Details:
- Date: {{sessionDate}}
- Time: {{sessionTime}}
- Duration: {{sessionDuration}}
- Coach: {{coachName}}
- Focus Area: {{sessionFocus}}

Preparation Tips:
- Review your goals and progress since the last session
- Prepare any questions or challenges you'd like to discuss
- Find a quiet, comfortable space for the session
- Test your video/audio connection if it's a virtual session

Join Session: {{sessionUrl}}

If you need to reschedule or cancel, please contact your coach as soon as possible.

Looking forward to our session!
{{coachName}}

© 2024 CoachCare. All rights reserved.
      `
    };
  }

  private getSessionConfirmationTemplate(): EmailTemplate {
    return {
      subject: 'Session Confirmed: {{sessionTitle}} on {{sessionDate}}',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Session Confirmed</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .session-info { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #28a745; }
            .button { display: inline-block; background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Session Confirmed!</h1>
              <p>Your coaching session has been scheduled</p>
            </div>
            <div class="content">
              <h2>Hi {{clientName}},</h2>
              <p>Great news! Your coaching session has been confirmed and is now on the calendar.</p>
              
              <div class="session-info">
                <h3>Session Details</h3>
                <p><strong>Title:</strong> {{sessionTitle}}</p>
                <p><strong>Date:</strong> {{sessionDate}}</p>
                <p><strong>Time:</strong> {{sessionTime}}</p>
                <p><strong>Duration:</strong> {{sessionDuration}}</p>
                <p><strong>Coach:</strong> {{coachName}}</p>
                <p><strong>Location:</strong> {{sessionLocation}}</p>
              </div>

              <h3>What to Expect</h3>
              <p>{{sessionDescription}}</p>

              <a href="{{sessionUrl}}" class="button">View Session Details</a>

              <h3>Next Steps</h3>
              <ul>
                <li>Add this session to your calendar</li>
                <li>Prepare any materials or questions for the session</li>
                <li>Set a reminder for 15 minutes before the session</li>
              </ul>

              <p>If you need to make any changes, please contact your coach at least 24 hours in advance.</p>

              <p>Looking forward to our session!<br>{{coachName}}</p>
            </div>
            <div class="footer">
              <p>© 2024 CoachCare. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Session Confirmed!

Hi {{clientName}},

Great news! Your coaching session has been confirmed and is now on the calendar.

Session Details:
- Title: {{sessionTitle}}
- Date: {{sessionDate}}
- Time: {{sessionTime}}
- Duration: {{sessionDuration}}
- Coach: {{coachName}}
- Location: {{sessionLocation}}

What to Expect:
{{sessionDescription}}

View Session Details: {{sessionUrl}}

Next Steps:
- Add this session to your calendar
- Prepare any materials or questions for the session
- Set a reminder for 15 minutes before the session

If you need to make any changes, please contact your coach at least 24 hours in advance.

Looking forward to our session!
{{coachName}}

© 2024 CoachCare. All rights reserved.
      `
    };
  }

  private getGoalDeadlineTemplate(): EmailTemplate {
    return {
      subject: 'Goal Deadline Approaching: {{goalTitle}}',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Goal Deadline</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .goal-info { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #ffc107; }
            .button { display: inline-block; background: #ffc107; color: #333; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Goal Deadline Approaching</h1>
              <p>Time to check in on your progress</p>
            </div>
            <div class="content">
              <h2>Hi {{clientName}},</h2>
              <p>Your goal deadline is approaching! Let's check in on your progress and see how we can support you.</p>
              
              <div class="goal-info">
                <h3>Goal Details</h3>
                <p><strong>Goal:</strong> {{goalTitle}}</p>
                <p><strong>Deadline:</strong> {{goalDeadline}}</p>
                <p><strong>Days Remaining:</strong> {{daysRemaining}}</p>
                <p><strong>Progress:</strong> {{goalProgress}}%</p>
                <p><strong>Description:</strong> {{goalDescription}}</p>
              </div>

              <h3>Progress Check</h3>
              <p>{{goalProgress}}% complete - {{progressMessage}}</p>

              <a href="{{goalUrl}}" class="button">Update Goal Progress</a>

              <h3>Need Support?</h3>
              <ul>
                <li>Schedule a quick check-in with your coach</li>
                <li>Break down the remaining tasks into smaller steps</li>
                <li>Adjust the timeline if needed</li>
                <li>Celebrate the progress you've made so far!</li>
              </ul>

              <p>Remember, goals are meant to stretch you, not stress you. We're here to support your success!</p>

              <p>Best regards,<br>{{coachName}}</p>
            </div>
            <div class="footer">
              <p>© 2024 CoachCare. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Goal Deadline Approaching

Hi {{clientName}},

Your goal deadline is approaching! Let's check in on your progress and see how we can support you.

Goal Details:
- Goal: {{goalTitle}}
- Deadline: {{goalDeadline}}
- Days Remaining: {{daysRemaining}}
- Progress: {{goalProgress}}%
- Description: {{goalDescription}}

Progress Check:
{{goalProgress}}% complete - {{progressMessage}}

Update Goal Progress: {{goalUrl}}

Need Support?
- Schedule a quick check-in with your coach
- Break down the remaining tasks into smaller steps
- Adjust the timeline if needed
- Celebrate the progress you've made so far!

Remember, goals are meant to stretch you, not stress you. We're here to support your success!

Best regards,
{{coachName}}

© 2024 CoachCare. All rights reserved.
      `
    };
  }

  private getGoalCompletedTemplate(): EmailTemplate {
    return {
      subject: '🎉 Goal Achieved: {{goalTitle}}',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Goal Achieved</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .celebration { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #28a745; text-align: center; }
            .button { display: inline-block; background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Goal Achieved!</h1>
              <p>Congratulations on your success!</p>
            </div>
            <div class="content">
              <h2>Hi {{clientName}},</h2>
              <p>Congratulations! You've successfully achieved your goal. This is a moment to celebrate your hard work and dedication.</p>
              
              <div class="celebration">
                <h3>🎯 Goal Completed</h3>
                <p><strong>{{goalTitle}}</strong></p>
                <p>{{goalDescription}}</p>
                <p><strong>Completed on:</strong> {{completionDate}}</p>
              </div>

              <h3>Your Achievement</h3>
              <p>{{achievementMessage}}</p>

              <a href="{{goalUrl}}" class="button">View Goal Details</a>

              <h3>What's Next?</h3>
              <ul>
                <li>Reflect on what you learned from this experience</li>
                <li>Consider setting your next goal</li>
                <li>Share your success with your support network</li>
                <li>Schedule a session to discuss your next steps</li>
              </ul>

              <p>Remember to take a moment to celebrate this milestone. You've earned it!</p>

              <p>Proud of your progress,<br>{{coachName}}</p>
            </div>
            <div class="footer">
              <p>© 2024 CoachCare. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
🎉 Goal Achieved!

Hi {{clientName}},

Congratulations! You've successfully achieved your goal. This is a moment to celebrate your hard work and dedication.

🎯 Goal Completed:
{{goalTitle}}
{{goalDescription}}
Completed on: {{completionDate}}

Your Achievement:
{{achievementMessage}}

View Goal Details: {{goalUrl}}

What's Next?
- Reflect on what you learned from this experience
- Consider setting your next goal
- Share your success with your support network
- Schedule a session to discuss your next steps

Remember to take a moment to celebrate this milestone. You've earned it!

Proud of your progress,
{{coachName}}

© 2024 CoachCare. All rights reserved.
      `
    };
  }

  private getPasswordResetTemplate(): EmailTemplate {
    return {
      subject: 'Reset Your CoachCare Password',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .button { display: inline-block; background: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Password Reset Request</h1>
              <p>Secure your account</p>
            </div>
            <div class="content">
              <h2>Hi {{userName}},</h2>
              <p>We received a request to reset your password for your CoachCare account.</p>
              
              <a href="{{resetUrl}}" class="button">Reset Password</a>

              <div class="warning">
                <h3>⚠️ Security Notice</h3>
                <p>This link will expire in 1 hour for your security. If you didn't request this password reset, please ignore this email and your password will remain unchanged.</p>
              </div>

              <h3>If the button doesn't work</h3>
              <p>Copy and paste this link into your browser:</p>
              <p>{{resetUrl}}</p>

              <h3>Need Help?</h3>
              <p>If you're having trouble accessing your account, contact our support team at support@coachcare.com</p>

              <p>Best regards,<br>The CoachCare Team</p>
            </div>
            <div class="footer">
              <p>© 2024 CoachCare. All rights reserved.</p>
              <p>This email was sent to {{email}} for security purposes.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Password Reset Request

Hi {{userName}},

We received a request to reset your password for your CoachCare account.

Reset Password: {{resetUrl}}

⚠️ Security Notice:
This link will expire in 1 hour for your security. If you didn't request this password reset, please ignore this email and your password will remain unchanged.

If the button doesn't work, copy and paste this link into your browser:
{{resetUrl}}

Need Help?
If you're having trouble accessing your account, contact our support team at support@coachcare.com

Best regards,
The CoachCare Team

© 2024 CoachCare. All rights reserved.
This email was sent to {{email}} for security purposes.
      `
    };
  }

  // Additional template methods (simplified for brevity)
  private getSessionCancelledTemplate(): EmailTemplate {
    return {
      subject: 'Session Cancelled: {{sessionTitle}}',
      html: `<div>Session cancelled email template</div>`,
      text: 'Session cancelled email template'
    };
  }

  private getSessionRescheduledTemplate(): EmailTemplate {
    return {
      subject: 'Session Rescheduled: {{sessionTitle}}',
      html: `<div>Session rescheduled email template</div>`,
      text: 'Session rescheduled email template'
    };
  }

  private getGoalUpdateTemplate(): EmailTemplate {
    return {
      subject: 'Goal Update: {{goalTitle}}',
      html: `<div>Goal update email template</div>`,
      text: 'Goal update email template'
    };
  }

  private getAssessmentReminderTemplate(): EmailTemplate {
    return {
      subject: 'Assessment Due: {{assessmentTitle}}',
      html: `<div>Assessment reminder email template</div>`,
      text: 'Assessment reminder email template'
    };
  }

  private getProgressReportTemplate(): EmailTemplate {
    return {
      subject: 'Progress Report: {{reportPeriod}}',
      html: `<div>Progress report email template</div>`,
      text: 'Progress report email template'
    };
  }

  private getAccountCreatedTemplate(): EmailTemplate {
    return {
      subject: 'Welcome to CoachCare - Account Created',
      html: `<div>Account created email template</div>`,
      text: 'Account created email template'
    };
  }

  private getPaymentReceivedTemplate(): EmailTemplate {
    return {
      subject: 'Payment Received - Thank You!',
      html: `<div>Payment received email template</div>`,
      text: 'Payment received email template'
    };
  }

  private getPaymentDueTemplate(): EmailTemplate {
    return {
      subject: 'Payment Due: {{amount}}',
      html: `<div>Payment due email template</div>`,
      text: 'Payment due email template'
    };
  }

  private getCoachingInvitationTemplate(): EmailTemplate {
    return {
      subject: 'You\'re Invited to Join CoachCare',
      html: `<div>Coaching invitation email template</div>`,
      text: 'Coaching invitation email template'
    };
  }

  private getFeedbackRequestTemplate(): EmailTemplate {
    return {
      subject: 'We Value Your Feedback',
      html: `<div>Feedback request email template</div>`,
      text: 'Feedback request email template'
    };
  }

  private getMonthlyReportTemplate(): EmailTemplate {
    return {
      subject: 'Monthly Progress Report - {{month}}',
      html: `<div>Monthly report email template</div>`,
      text: 'Monthly report email template'
    };
  }

  // Convenience methods for common email scenarios
  async sendWelcomeEmail(client: Client, coach: User): Promise<{ success: boolean; message: string }> {
    return this.sendEmail({
      to: client.email,
      toName: client.name,
      from: this.defaultFrom,
      fromName: this.defaultFromName,
      template: 'welcome-client',
      data: {
        clientName: client.name,
        coachName: coach.name,
        dashboardUrl: `${process.env.REACT_APP_BASE_URL}/dashboard`,
        gettingStartedUrl: `${process.env.REACT_APP_BASE_URL}/getting-started`,
        faqUrl: `${process.env.REACT_APP_BASE_URL}/faq`,
        supportUrl: `${process.env.REACT_APP_BASE_URL}/support`,
        email: client.email
      }
    });
  }

  async sendSessionReminder(session: Session, client: Client, coach: User): Promise<{ success: boolean; message: string }> {
    return this.sendEmail({
      to: client.email,
      toName: client.name,
      from: this.defaultFrom,
      fromName: this.defaultFromName,
      template: 'session-reminder',
      data: {
        clientName: client.name,
        sessionDate: new Date(session.date).toLocaleDateString(),
        sessionTime: new Date(session.date).toLocaleTimeString(),
        sessionDuration: `${session.duration} minutes`,
        coachName: coach.name,
        sessionFocus: session.title,
        sessionUrl: `${process.env.REACT_APP_BASE_URL}/sessions/${session.id}`
      }
    });
  }

  async sendGoalDeadlineReminder(goal: Goal, client: Client, coach: User): Promise<{ success: boolean; message: string }> {
    const deadline = new Date(goal.targetDate);
    const today = new Date();
    const daysRemaining = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    return this.sendEmail({
      to: client.email,
      toName: client.name,
      from: this.defaultFrom,
      fromName: this.defaultFromName,
      template: 'goal-deadline',
      data: {
        clientName: client.name,
        goalTitle: goal.title,
        goalDeadline: deadline.toLocaleDateString(),
        daysRemaining: daysRemaining,
        goalProgress: goal.progress || 0,
        goalDescription: goal.description,
        progressMessage: daysRemaining <= 1 ? 'Urgent: Deadline is tomorrow!' : `You have ${daysRemaining} days to complete this goal.`,
        goalUrl: `${process.env.REACT_APP_BASE_URL}/goals/${goal.id}`,
        coachName: coach.name
      }
    });
  }

  async sendPasswordResetEmail(user: User, resetToken: string): Promise<{ success: boolean; message: string }> {
    return this.sendEmail({
      to: user.email,
      toName: user.name,
      from: this.defaultFrom,
      fromName: this.defaultFromName,
      template: 'password-reset',
      data: {
        userName: user.name,
        resetUrl: `${process.env.REACT_APP_BASE_URL}/reset-password?token=${resetToken}`,
        email: user.email
      }
    });
  }
}

export const emailService = new EmailService();
