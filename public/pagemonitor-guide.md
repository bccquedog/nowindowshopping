# Page Monitor Pro - User Guide

This guide matches the current extension UI and covers the popup, options page, downloadable item tracking, and the MyNavyExchange product workflow.

## 1. Install

1. Open `chrome://extensions`
2. Turn on **Developer mode**
3. Click **Load unpacked**
4. Select the folder that contains `manifest.json`

## 2. First monitor

1. Open the page you want to watch
2. Open the `Page Monitor Pro` popup
3. In **Refresh**, set `Mode` to `Interval`
4. Set `Interval (sec)` to a value like `10`
5. In **Monitor**, enable **page monitor**
6. Set `Monitor mode` to `Keyword appears`
7. Choose a `Keyword preset`
8. Click **Start**

Expected result:

- `Current tab status` shows **Running**
- `Next refresh` begins counting down
- The current page appears in **Active tabs**

## 3. Refresh controls

- `Mode`
  - `Interval` uses a fixed refresh schedule
  - `Random` uses the min/max range each cycle
- `Countdown (sec)`
  - delay before the first refresh
- `Refresh limit`
  - `0` means unlimited
- `Hard refresh`
  - reloads while bypassing cache
- `Show visual timer`
  - shows a page overlay countdown
- `Stop on click/typing`
  - stops the task when you interact with the page

## 4. Monitor controls

- `Site profile`
  - use `Generic` for normal pages
  - use `MyNavyExchange` for product automation
- `Monitor mode`
  - `Keyword appears`
  - `Keyword disappears`
  - `Negative keyword appears`
  - `Any page change`
- `Expression`
  - `Text`
  - `Regex`
  - `XPath`
- `Source`
  - `Visible text`
  - `HTML source`
- `Keyword preset`
  - `Add to cart`
  - `In stock`
  - `Available now`
  - `Downloadable item`
  - `Custom`
- `Negative keywords preset`
  - `Sold out defaults`
  - `None`
  - `Custom`
- `Run checkout action flow on match`
  - runs the assist flow after a successful match
- `Enable debug trace`
  - shows the latest assist log in the popup
- `Checkout assist mode`
  - `Site built-in flow (recommended)`
  - `Custom selectors`
- `Preferred size`
  - choose a built-in size or `Custom`
- `Delay between action flow steps (ms)`
  - adds wait time between automation steps
- `Stop refreshing on match`
  - ends the monitor once a match is found
- `Browser notification on match`
  - shows a local notification

## 5. Downloadable item preset

Use this when you want to detect downloadable access or downloadable product availability.

1. Enable the monitor
2. Set `Monitor mode` to `Keyword appears`
3. Set `Keyword preset` to `Downloadable item`
4. Start with `Source` = `Visible text`
5. If the page content is hard to detect, switch to `HTML source`

The preset uses the keyword `downloadable`.

## 6. Negative keywords

Negative keywords can be:

- comma separated
- newline separated

Behavior:

- In `Keyword appears`, a match requires:
  1. the positive keyword is found
  2. no negative keyword is present
- In `Negative keyword appears`, any matching negative keyword triggers

## 7. MyNavyExchange quick setup

1. Open a `mynavyexchange.com` product page
2. Click **Use MyNavyExchange preset**
3. Confirm `Site profile` is set to `MyNavyExchange`
4. Set a preferred size
5. Click **Assist checkout now** to test the workflow, or click **Start** to wait for the trigger

The built-in flow is designed around:

1. size selection
2. add to cart
3. open cart
4. checkout

## 8. Current tab status and active tabs

The popup status area shows:

- running/stopped state
- next refresh countdown
- completed refresh count

The **Active tabs** panel shows every currently running task and lets you jump to that tab.

## 9. Options page

Open from popup -> **Options**

Available settings:

- `Auto-start URL rules`
  - one pattern per line
  - supports `*` wildcard
- `Predefined URLs`
  - stores commonly monitored pages
- `Default monitor keyword`
  - pre-fills the keyword field
- `Default negative keywords`
  - pre-fills the negative list
- `Remote webhook notifications`
  - sends alerts to external services
- `Sound notifications`
  - controls volume, repeat count, and frequency

## 10. Remote notifications

In **Options**:

1. Enable **Remote webhook notifications**
2. Enter the webhook URL
3. Optionally add an auth token
4. Set the cooldown
5. Save options

Common destinations:

- Discord
- Slack
- Zapier
- Make
- IFTTT / Pushover bridges

## 11. Sound notifications

In **Options**:

- enable/disable sound
- set volume
- set repeat count
- set tone frequency
- click **Test sound**

Notes:

- sound is played in the active page tab context
- keep a normal web page open during testing

## 12. Keyboard shortcuts

- `Ctrl+Shift+Y` / `Cmd+Shift+Y`
  - start or stop the current tab
- `Ctrl+Shift+U` / `Cmd+Shift+U`
  - stop all active tasks

Chrome shortcut settings:

- `chrome://extensions/shortcuts`

## 13. Troubleshooting

- Extension does not load
  - confirm the folder contains `manifest.json`
  - check `chrome://extensions` for errors
- No refresh happening
  - confirm the status is **Running**
  - check the refresh interval and countdown
  - avoid Chrome internal pages like `chrome://...`
- Keyword not matching
  - switch between `Visible text` and `HTML source`
  - re-check custom regex or XPath expressions
  - confirm negative keywords are not suppressing the positive match
- Remote notifications not arriving
  - re-check the webhook URL
  - lower cooldown for testing
  - confirm the endpoint accepts JSON POST
- Sound test fails
  - keep a normal page open
  - interact with the page before testing again
  - confirm browser/system audio is enabled
