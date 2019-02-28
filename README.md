# traq
Super simple email open/click tracking server.

For each event, it logs a JSON object to the output (a.k.a [JSON Lines](http://jsonlines.org/)). You can then pipe it to any program that you want to further processing.

```
{
  "dateTime": "2019-02-28T00:47:44.819Z",
  "type": "click",
  "ip": "93.184.216.34",
  "headers": {
    "host": "localhost:3000",
    "connection": "keep-alive",
    "upgrade-insecure-requests": "1",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36",
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9"
  },
  "data": {
    "url": "http://example.com",
    "key1": "value1",
    "key2": "value2"
  }
}
```

## Usage

Run the server:

```
node ./src/server.js [port]
```

Default port is 3000.

For open tracking, insert an image into your email and point it to:

```
http://yourserver/o?key1=value1&key2=value2
```

For click tracking, change the links in your email to:

```
http://yourserver/c?url=<actualurl>&key1=value1&key2=value2
```

## Docker

The docker image writes the output to the file specified as the first argument:

```
docker run --rm -p 3000:3000 -v ./log:/var/log/traq soheilpro/traq /var/log/traq/traq.log
```

## Version History
+ **1.0**
	+ Initial release.

## Author
**Soheil Rashidi**

+ http://soheilrashidi.com
+ http://twitter.com/soheilpro
+ http://github.com/soheilpro

## Copyright and License
Copyright 2019 Soheil Rashidi.

Licensed under the The MIT License (the "License");
you may not use this work except in compliance with the License.
You may obtain a copy of the License in the LICENSE file, or at:

http://www.opensource.org/licenses/mit-license.php

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
