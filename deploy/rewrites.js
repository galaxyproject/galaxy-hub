function handler(event) {
  var request = event.request;
  var uri = request.uri;

  var patterns = [
    { pattern: "^/bushman/?$", target: "https://usegalaxy.org/bushman/" },
    { pattern: "^/learn/api/?$", target: "/develop/api/" },
    { pattern: "^/admin/api/?$", target: "/develop/api/" },
  ];

  for (var i = 0; i < patterns.length; i++) {
    var re = new RegExp(patterns[i].pattern);
    var m = uri.match(re);
    if (m) {
      var dest = patterns[i].target.replace("$1", m[1]);
      return {
        statusCode: 302,
        statusDescription: "Found",
        headers: { location: { value: dest } },
      };
    }
  }

  return request;
}
