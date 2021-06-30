import "bootstrap";
import $ from "jquery";
import "../style/styles.scss";
import axios from "axios";
import _ from "lodash";

export function zoteroSearchOnLoad(){
    var match = RegExp('[?&]q=([^&]*)').exec(window.location.search);
    var qstr = match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    if (qstr){
        $("#search-input").val(qstr);
        axios.get('https://api.zotero.org/groups/1732893/items/top?start=0&limit=25&q='+qstr).then(function(response){
            if (response.data.length != 0){
                var tmpl = _.template(`
                    <ul class="list-group list-group-flush">
                    <% _.forEach(results, function(result) { %>
                        <li class="list-group-item">
                            <h4>
                                <a href="<%- result.data.url %>">
                                    <%- result.data.title %>
                                </a>
                            </h4>
                            <p style="color: #093">
                                <%- result.data.url %>
                            </p>
                            <% if (result.data.abstractNote) { %>
                                <p><%- result.data.abstractNote.slice(0, 450) %>...</p>
                            <% } %>
                        </li>
                    <% }); %>
                    </ul>`);
                $("#zotero-pane").html(tmpl({"results": response.data}));
            }
            else{
                $("#zotero-pane").html(`<p>Search finished for <strong>'${qstr}'</strong> with no results.  Please refine your query and try again!</p>`);
             }
        }).catch(function(error){
            $("#zotero-pane").text(error);
            console.log(error);
        });
    }
}
