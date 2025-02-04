import * as pulumi from "@pulumi/pulumi";
import * as command from "@pulumi/command";

// Access variables from GitLab CI/CD environment
const apiKey = process.env.GODADDY_API_KEY;
const apiSecret = process.env.GODADDY_API_SECRET;
const domain = process.env.DOMAIN;

if (!apiKey || !apiSecret || !domain) {
    throw new Error(
        "Missing required environment variables: GODADDY_API_KEY, GODADDY_API_SECRET, or DOMAIN"
    );
}

// Record details
const recordType = "A";
const recordName = "test";
const recordValue = "1.2.3.4";
const ttl = 600;

const createRecord = new command.local.Command("createRecord", {
    create: pulumi.interpolate`curl -X PUT "https://api.godaddy.com/v1/domains/${domain}/records/${recordType}/${recordName}" \
-H "Authorization: sso-key ${apiKey}:${apiSecret}" \
-H "Content-Type: application/json" \
-d '[{"data": "${recordValue}", "ttl": ${ttl}}]'`,
});

export const output = createRecord.stdout;