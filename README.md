# discordsnailbot
---
This is the documentation for node-js based discordnailbot. See Commands-section for supported commands.

## Commands
Snailbot currently supports the following commands

* snail
* bob

### snail 
With snail, snailbot sends a [video](https://www.youtube.com/watch?v=Sg_lJ4k1yY0) to the current channel.

### bob
With bob, snailbot checks twitch, whether [Bob Ross](https://www.twitch.tv/bobross) is currently streaming.

## Hidden feature
In order to provide this [video](https://www.youtube.com/watch?v=Sg_lJ4k1yY0) to the current channel without enforcing it, the video will be send to the channel every few messages.

## Changelog
* 2019-09-17: initial alpha release with version 0.04

----
## Dependencies
* [discord.io](https://github.com/woor/discord.io/tarball/gateway_v6)
* [axios] (https://github.com/axios/axios)
* [winston] (https://github.com/winstonjs/winston)
