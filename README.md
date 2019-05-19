# mdls

OSX's mdls from node.

A thin wrapper around [mdls](https://developer.apple.com/library/Mac/documentation/Darwin/Reference/ManPages/man1/mdls.1.html).

You give it a path, it runs mdls and calls a callback with the result.

Install:

`npm install --save mdls`

Usage:

```js
try {
    const data = await mdls('./index.js');
    console.log('Data', data);
} catch (err) {
    console.log('Error', err);
}
```

If all goes well, this will log:

```
{ ItemContentCreationDate: Sat May 17 2014 14:32:53 GMT-0700 (PDT),
  ItemContentModificationDate: Sat May 17 2014 15:01:52 GMT-0700 (PDT),
  ItemContentType: 'com.netscape.javascript-source',
  ItemContentTypeTree:
   [ 'com.netscape.javascript-source',
     'public.source-code',
     'public.plain-text',
     'public.text',
     'public.data',
     'public.item',
     'public.content',
     'public.executable' ],
  ItemDateAdded: Sat May 17 2014 14:32:53 GMT-0700 (PDT),
  ItemDisplayName: 'index.js',
  ItemFSContentChangeDate: Sat May 17 2014 15:01:52 GMT-0700 (PDT),
  ItemFSCreationDate: Sat May 17 2014 14:32:53 GMT-0700 (PDT),
  ItemFSCreatorCode: '',
  ItemFSFinderFlags: 0,
  ItemFSHasCustomIcon: 0,
  ItemFSInvisible: 0,
  ItemFSIsExtensionHidden: 0,
  ItemFSIsStationery: 0,
  ItemFSLabel: 0,
  ItemFSName: 'index.js',
  ItemFSNodeCount: 1554,
  ItemFSOwnerGroupID: 20,
  ItemFSOwnerUserID: 501,
  ItemFSSize: 1554,
  ItemFSTypeCode: '',
  ItemKind: 'JavaScript',
  ItemLogicalSize: 1554,
  ItemPhysicalSize: 4096 }
```

Each date above is a JavaScript date object. You can get the Unix timestamp out
with the `getTime` method of each object.

Note that running `mdls` the command line utility would have returned:

```
kMDItemContentCreationDate     = 2014-05-17 21:32:53 +0000
kMDItemContentModificationDate = 2014-05-17 22:01:52 +0000
kMDItemContentType             = "com.netscape.javascript-source"
kMDItemContentTypeTree         = (
    "com.netscape.javascript-source",
    "public.source-code",
    "public.plain-text",
    "public.text",
    "public.data",
    "public.item",
    "public.content",
    "public.executable"
)
kMDItemDateAdded               = 2014-05-17 21:32:53 +0000
kMDItemDisplayName             = "index.js"
kMDItemFSContentChangeDate     = 2014-05-17 22:01:52 +0000
kMDItemFSCreationDate          = 2014-05-17 21:32:53 +0000
kMDItemFSCreatorCode           = ""
kMDItemFSFinderFlags           = 0
kMDItemFSHasCustomIcon         = 0
kMDItemFSInvisible             = 0
kMDItemFSIsExtensionHidden     = 0
kMDItemFSIsStationery          = 0
kMDItemFSLabel                 = 0
kMDItemFSName                  = "index.js"
kMDItemFSNodeCount             = 1554
kMDItemFSOwnerGroupID          = 20
kMDItemFSOwnerUserID           = 501
kMDItemFSSize                  = 1554
kMDItemFSTypeCode              = ""
kMDItemKind                    = "JavaScript"
kMDItemLogicalSize             = 1554
kMDItemPhysicalSize            = 4096
```
