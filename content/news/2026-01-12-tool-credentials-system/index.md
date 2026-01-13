---
title: "Secure Your Tools with Galaxy's New Credentials System"
date: "2026-01-12"
tease: "Galaxy 25.1 introduces a powerful new credentials system that lets tools securely access external APIs and services with encrypted secret storage and a streamlined user experience."
authors: Arash Kadkhodaei
subsites: [all]
tags: [tools, security, feature]
---

If you've ever needed to use a Galaxy tool that connects to an external service—like OpenAI's ChatGPT, cloud storage providers, or specialized databases—you know the challenge: how do you securely provide your API keys, passwords, or other credentials? Until now, the approach often involved configuring user preferences or hardcoding sensitive information in configuration files, which was neither secure nor user-friendly.

**Galaxy 25.1 changes all of that** with a comprehensive new **tool credentials system** that makes it easy and secure for both users and tool developers to work with external services.

# Why This Matters

Many powerful scientific tools need to connect to external APIs and services:
- **AI/ML tools** like ChatGPT require API keys from providers like OpenAI
- **Cloud storage tools** need credentials to access AWS S3, Google Cloud, or Azure
- **Database tools** require authentication to query remote databases
- **Specialized services** might need tokens or passwords for proprietary APIs

Previously, handling these credentials required users to manually configure preferences through the user preferences system, which was less intuitive and required administrator setup. The new system provides a more streamlined, integrated experience with enhanced security features.

# What's New in Galaxy 25.1

The new credentials system provides a complete, secure solution for managing tool credentials:

## 🔐 Secure Vault Storage

All sensitive information (secrets like API keys, passwords, tokens) is now stored encrypted in Galaxy's vault system. Your credentials are protected with industry-standard encryption and isolated per user—no more plain text files or insecure storage.

## 🎨 Streamlined User Experience

When you run a tool that needs credentials, Galaxy now presents a clean, intuitive interface right in the tool form:
- **Clear prompts** for required credentials when launching a tool
- **Centralized management** in User Preferences for all your credentials
- **Multiple credential groups** so you can manage different accounts or contexts (e.g., personal vs. work AWS accounts)
- **Real-time validation** to ensure you've provided everything the tool needs

## 🛠️ Simple Tool Definition

For tool developers, defining credential requirements is now straightforward and declarative using a new `<credentials>` element in tool XML:

```xml
<requirements>
    <credentials name="openai_credentials" version="1.0" 
                 label="OpenAI Credentials" 
                 description="Credentials for accessing OpenAI's API.">
        <secret name="openai_api_key" 
                inject_as_env="OPENAI_API_KEY" 
                optional="false" 
                label="OpenAI API Key" 
                description="Your OpenAI API key. Get it from your OpenAI account dashboard."/>
    </credentials>
</requirements>
```

## ⚙️ Automatic Injection

Credentials are automatically injected as environment variables when tools run—no manual file handling or complex configuration needed. Your tool script simply reads from the environment:

```python
import os
api_key = os.getenv("OPENAI_API_KEY")
```

## 🌐 Full API Support

The system includes a complete REST API (`/api/users/{user_id}/credentials`) for programmatic credential management, making it easy to integrate with external systems or build custom workflows.

## 📊 Workflow Integration

Credentials work seamlessly in workflows, with status indicators showing whether required credentials are configured before you run complex multi-step analyses.

# How to Use It: For Galaxy Users

Let's walk through using a tool that requires credentials:

## Running a Tool with Credentials

1. **Select your tool** from the tool panel (e.g., the ChatGPT tool)
2. **Look for the credentials section** in the tool form—it will appear automatically if the tool requires credentials
3. **Provide your credentials** by either:
   - Selecting an existing credential group from the list (if you've already configured one) by clicking "Use this group"
   - Creating a new credential group by clicking "Create New Group"
4. **Fill in the required fields**:
   - **Secrets**: Sensitive data like API keys (shown as password fields)
   - **Variables**: Non-sensitive config like URLs or usernames (shown as text fields)
5. **Save and run** your tool—Galaxy securely stores your credentials and injects them for the tool

## Managing Your Credentials

You can manage all your credentials in one place:

1. Go to **User → Preferences** in the top menu
2. Select **Manage Your Tools Credentials**
3. Here you can:
   - View all your credential groups
   - Edit existing credentials
   - Delete credentials you no longer need

Each credential group is tied to a specific tool requirement (like "OpenAI Credentials" or "AWS S3 Access"), and you can have multiple groups for the same requirement (e.g., different API keys for different projects).

# Migration Guide for Tool Developers

If you maintain Galaxy tools that currently use the old user preferences approach for API keys or other secrets, migrating to the new credentials system is straightforward and highly recommended.

## Example: Migrating the ChatGPT Tool

Here's a real-world example of how the ChatGPT tool was migrated from user preferences to the credentials system:

### Before: Using User Preferences

**Tool XML (old approach):**
```xml
<command detect_errors="exit_code"><![CDATA[
...
python '$__tool_directory__/chatgpt.py'
'$context_files'
'$prompt'
'$model'
'$openai_api_key_file'
]]></command>
...
<configfiles>
   <configfile name="openai_api_key_file"><![CDATA[
$__user__.extra_preferences.get('chatgpt|api_key', "")
   ]]></configfile>
</configfiles>
```

**User Preferences Config (user_preferences_extra.yml):**
```yaml
preferences:
    chatgpt:
        description: Your ChatGPT API key
        inputs:
            - name: api_key
              label: API key
              type: secret
              required: False
```

**Python Script:**
```python
# Read from config file
with open(sys.argv[4], "r") as f:
    openai_api_key = f.read().strip()
```

**Problems:**
- Requires admin configuration in `user_preferences_extra.yml`
- Users must navigate to "Manage Information" in preferences
- API key stored in intermediate config files
- No validation of required credentials
- Not obvious to users where to configure

### After: Using the Credentials System

**Tool XML (new approach):**
```xml
<requirements>
    ...
    <credentials name="openai_credentials" version="1.0" x
                 label="OpenAI Credentials" 
                 description="Credentials for accessing OpenAI's API.">
        <secret name="openai_api_key" 
                inject_as_env="OPENAI_API_KEY" 
                optional="false" 
                label="OpenAI API Key" 
                description="Your OpenAI API key is required to use this tool. You can obtain it from your OpenAI account dashboard."/>
    </credentials>
</requirements>
```

**Python Script:**
```python
# Read from environment variable
openai_api_key = os.getenv("OPENAI_API_KEY")
```

**Benefits:**
- ✅ No admin configuration needed
- ✅ Credentials prompted directly in the tool form
- ✅ Secure vault storage
- ✅ Clear validation of required fields
- ✅ Better user experience
- ✅ No intermediate files

## Step-by-Step Migration Guide

Here's how to migrate your own tools:

### 1. Update Your Tool Profile

Ensure your tool uses profile version 25.1 or later:

```xml
<tool id="your_tool" name="Your Tool" version="1.0" profile="25.1">
```

### 2. Define Credentials in Requirements

Add a `<credentials>` element inside `<requirements>`:

```xml
<requirements>
    <!-- Your existing package requirements -->
    <requirement type="package" version="1.0">some-package</requirement>
    
    <!-- Add credentials definition -->
    <credentials name="your_service_credentials" 
                 version="1.0" 
                 label="Your Service Credentials" 
                 description="Credentials for accessing Your Service.">
        
        <!-- Define secrets (encrypted) -->
        <secret name="api_key" 
                inject_as_env="YOUR_SERVICE_API_KEY" 
                optional="false" 
                label="API Key" 
                description="Your service API key"/>
        
        <!-- Define variables (non-sensitive) -->
        <variable name="api_endpoint" 
                  inject_as_env="YOUR_SERVICE_ENDPOINT" 
                  optional="true" 
                  label="API Endpoint" 
                  description="Custom API endpoint (optional)"/>
    </credentials>
</requirements>
```

### 3. Update Your Tool Script

Change from reading config files to reading environment variables:

**Python:**
```python
import os

api_key = os.getenv("YOUR_SERVICE_API_KEY")
endpoint = os.getenv("YOUR_SERVICE_ENDPOINT", "https://default-endpoint.com")
```

**R:**
```r
api_key <- Sys.getenv("YOUR_SERVICE_API_KEY")
endpoint <- Sys.getenv("YOUR_SERVICE_ENDPOINT", "https://default-endpoint.com")
```

**Bash:**
```bash
#!/bin/bash
API_KEY="${YOUR_SERVICE_API_KEY}"
ENDPOINT="${YOUR_SERVICE_ENDPOINT:-https://default-endpoint.com}"
```

### 4. Remove Old Configuration

- Remove `<configfile>` elements for credentials or any similar option the tool is using
- Remove entries from `user_preferences_extra.yml` (This should be done by an admin)
- Remove any README instructions about admin configuration

### 5. Update Documentation

Update your tool's help section to mention that users will be prompted for credentials when running the tool.

## Best Practices

When defining credentials for your tools:

1. **Use descriptive labels and descriptions** so users understand what each credential is for
2. **Mark secrets as required** (`optional="false"`) if the tool cannot function without them
3. **Provide clear instructions** in descriptions about where to obtain credentials (e.g., "Get your API key from https://example.com/api-keys")
4. **Use sensible environment variable names** that match common conventions (e.g., `AWS_ACCESS_KEY_ID`)
5. **Group related credentials** under a single credentials requirement (e.g., all AWS credentials together)
6. **Test thoroughly** to ensure environment variables are properly injected

# Learn More

- **Feature Pull Request:** [galaxyproject/galaxy #19084](https://github.com/galaxyproject/galaxy/pull/19084) - See the complete implementation details
- **Galaxy Vault Documentation:** [Admin vault setup guide](https://docs.galaxyproject.org/en/master/admin/special_topics/vault.html)
- **Migration Example:** [ChatGPT tool migration PR](https://github.com/bgruening/galaxytools/pull/1702)

## Video Demo

Watch the credentials system in action:

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/2xEFtTS3DSk?si=EwqNBUUomxQO55QW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

We're excited to see how the community adopts this system and what new tool integrations it enables. If you have tools that currently use user preferences or other workarounds for credentials, we encourage you to migrate to this new system.

**The credentials system is available now in Galaxy 25.1—try it out and let us know what you think!**
