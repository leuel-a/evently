<!-- BEGIN:nextjs-agent-rules -->

Read and follow "/tmp/next-upgrade-QLuzt7/upgrade/shared.md" first. Attempt its applicable duplicate checks before changing files. If a check is unavailable, report it and continue. Stop only if you find equivalent work. Then read and follow every applicable instruction in "/tmp/next-upgrade-QLuzt7/upgrade/same-major.md".

We're upgrading the app in "/home/leuel/projects/leuela/evently/apps/web" from Next.js 16.4.2 to 16.4.6 because the installed version is affected by a published security advisory.

Follow the user's worktree choice. If they do not specify, use a separate Git worktree when the app is in a Git repository. Run upgrade commands from this app's corresponding directory in that worktree. If the app is not in a Git repository, upgrade it in place.

Set `experimental.agentUpgrade` to "security" in the app's Next.js config as part of this upgrade. Preserve unrelated configuration. If the target Next.js version does not support this option, skip the setting and report why.

References:
- https://registry.npmjs.org/-/npm/v1/security/advisories/bulk
- https://registry.npmjs.org/next

When this task ends, report its result once. After completing the requested upgrade and all applicable verification, run `npx --yes next@16.5.0-canary.54 internal report-agent-upgrade 1c52eeaf-25e9-492d-968a-2f0a1450c9b6 success`. If the attempted upgrade remains unsuccessful after repairs or verification fails, run `npx --yes next@16.5.0-canary.54 internal report-agent-upgrade 1c52eeaf-25e9-492d-968a-2f0a1450c9b6 failure`. If you stop for duplicate work, user cancellation, or an unavailable prerequisite, do not report success or failure. Explain the result to the user separately; never include project details or error text in the telemetry command.

<!-- END:nextjs-agent-rules -->
