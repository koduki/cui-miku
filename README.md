## Overview

This project is a implemention of Character User Interface for smart device.
This is not text only UI. :P 

CUI is inspired by Siri and Ukagaka.

## Demo

http://www.nicovideo.jp/watch/sm18299784


## Platform

Only Android is supported now. 

## Test

ant coffee-test

## Install

ant -Dadb.device.arg="-s emulator-5554" clean coffee-compile debug install
