# Migrate Old SSB Identities to New SSB Identities Plugin

![ssb-identities-migrate.png](ssb-identities-migrate.png)

Migrate The old version of `everlife-api-1` to the new `ssb-identities`
version.

# Introduction
The old version of
[everlife-api-1](https://github.com/everlifeai/everlife-api-1)
stored the SSB identities directly under the `data/` folder. We have
moved to using the new, standard, `ssb-identities` plugin which stores
the data under `data/__ssb/identities` folder.

This module migrates the existing user files from the old data folder to
the new.

# Setup

1. Download this module
2. Run `yarn install`

# Usage

        $ yarn migrate everlife-api-1_old/data everlife-api-1/data


# Feedback

Report bugs, feedback etc to Everlife.ai
