# Customizing Galaxy's GenomeSpace Integration

If you are customizing your own local Galaxy Instance to work with your own local GenomeSpace server, there are several changes that you need to make.

These directions indicate how to update Galaxy to make use of the server named *prod* in your GenomeSpace Server properties list.

## URLS

First, create a list of the URLs you will need:

<table>
  <tr>
    <td> <strong>URL purpose</strong></td>
    <td> <strong>Default Value</strong></td>
  </tr>
  <tr>
    <td> <a href="/src/GenomeSpace/index.md">GenomeSpace</a> OpenID Provider</td>
    <td> <a href='https://identity.genomespace.org/identityServer/xrd.jsp'>https://identity.genomespace.org/identityServer/xrd.jsp</a></td>
  </tr>
  <tr>
    <td> <a href="/src/GenomeSpace/index.md">GenomeSpace</a> Server properties list</td>
    <td> <a href='http://www.genomespace.org/sites/genomespacefiles/config/serverurl.properties'>http://www.genomespace.org/sites/genomespacefiles/config/serverurl.properties</a></td>
  </tr>
  <tr>
    <td> <a href="/src/GenomeSpace/index.md">GenomeSpace</a> Data Manager Default Directory</td>
    <td> <a href='https://dm.genomespace.org/datamanager/defaultdirectory'>https://dm.genomespace.org/datamanager/defaultdirectory</a></td>
  </tr>
</table>


## OpenID

In your universe_wsgi.ini file set: enable_openid = True

Modify the GenomeSpace OpenID configuration openid/genomespace.xml to point your *[GenomeSpace](/src/GenomeSpace/index.md) OpenID provider*.

## Tools

In tools/genomespace/genomespace_exporter.py change the value of the constant *GENOMESPACE_SERVER_URL_PROPERTIES* to the value for the *[GenomeSpace](/src/GenomeSpace/index.md) Server properties list* URL; do the same in tools/genomespace/genomespace_file_browser.py and in tools/genomespace/genomespace_importer.py.

In tools/genomespace/genomespace_file_browser_prod.xml change the *[GenomeSpace](/src/GenomeSpace/index.md) Data Manager Default Directory* in `<inputs action="https://dm.genomespace.org/datamanager/defaultdirectory" check_values="False" method="post">` to the new URL.
