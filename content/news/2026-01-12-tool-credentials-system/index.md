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
- **Database tools** require authentication to query remote databases
- **Specialized services** might need tokens or passwords for proprietary APIs

Previously, handling these credentials required users to manually configure preferences through the user preferences system, which was less intuitive and required administrator setup. The new system provides a more streamlined, integrated experience with enhanced security features.

# What's New in Galaxy 25.1

The new credentials system provides a complete, secure solution for managing tool credentials:

## 🔐 Secure Vault Storage

All sensitive information (secrets like API keys, passwords, tokens) is now stored encrypted in Galaxy's vault system.

## 🎨 Streamlined User Experience

When you run a tool that needs credentials, Galaxy now presents a clean, intuitive interface right in the tool form:
- **Clear prompts** for required credentials when launching a tool
- **Centralized management** in User Preferences for all your credentials
- **Multiple credential groups** so you can manage different accounts or contexts (e.g., personal and work API keys)
- **Real-time validation** to ensure you've provided everything the tool needs

![Screenshot showing the credentials interface in a tool form](credentials.png)

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

Credentials are automatically injected as environment variables when tools run—no manual file handling or complex configuration needed. Your tool's executable can access them securely from the environment.

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

Migrating from the user preferences approach to the credentials system is straightforward. Here's the key change:

**Old approach:** Define credentials in `user_preferences_extra.yml`, read from config files
```python
# Old: Read from config file
with open(sys.argv[4], "r") as f:
    api_key = f.read().strip()
```

**New approach:** Define credentials in tool XML, read from environment variables
```xml
<requirements>
    <credentials name="openai_credentials" version="1.0">
        <secret name="openai_api_key" inject_as_env="OPENAI_API_KEY"/>
    </credentials>
</requirements>
```
```python
# New: Read from environment
api_key = os.getenv("OPENAI_API_KEY")
```

## Migration Steps

1. **Update tool profile** to 25.1 or later
2. **Add `<credentials>` element** in `<requirements>` with your secrets/variables
3. **Update tool script** to read from environment variables instead of config files
4. **Remove old `<configfile>` elements** and user preferences config

See the [ChatGPT tool migration](https://github.com/bgruening/galaxytools/pull/1702) for a complete example

# Learn More

- **Feature Pull Request:** [galaxyproject/galaxy #19084](https://github.com/galaxyproject/galaxy/pull/19084) - See the complete implementation details
- **Galaxy Vault Documentation:** [Admin vault setup guide](https://docs.galaxyproject.org/en/master/admin/special_topics/vault.html)
- **Migration Example:** [ChatGPT tool migration PR](https://github.com/bgruening/galaxytools/pull/1702)

## Video Demo

Watch the credentials system in action:

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/2xEFtTS3DSk?si=EwqNBUUomxQO55QW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

We're excited to see how the community adopts this system and what new tool integrations it enables. If you have tools that currently use user preferences or other workarounds for credentials, we encourage you to migrate to this new system.

**The credentials system is available now in Galaxy 25.1, try it out and let us know what you think!**
