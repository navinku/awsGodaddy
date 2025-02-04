# awsec2

Pulumi does not have a direct provider for GoDaddy. However, you can use the pulumi-command provider to execute shell commands that interact with GoDaddy's API or other tools that can manage GoDaddy DNS records.

First, make sure you have the pulumi-command provider installed:

---
npm install @pulumi/command
---