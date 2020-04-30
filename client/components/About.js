import React from 'react';


const About = () => {
  return (
    <div id="about">

<p><img src="https://i.imgur.com/1glvQfz.png" alt="logo"/></p>
<p><a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"/></a></p>
<h2 id="topographql">TopoGraphQL</h2>
<p>TopoGraphQL is an open-source GraphQL IDE, schema visualizer, and endpoint analytics tool with Apollo Tracing Support. Intuitive and easy-to-use, TopoGraphQL provides developers a streamlined, in-browser solution for navigating and testing complex GraphQL APIs and queries.</p>
<h2 id="features">Features</h2>
<ul>
<li>🔎 Enhance the design of your data models and API by exploring your schema as a graph</li>
<li>🚥 Test and reduce inefficiencies in your GraphQL queries by visualizing the query response path</li>
<li>🚀 Visualize resolver-level performance data with support for <a href="https://github.com/apollographql/apollo-tracing">Apollo Tracing</a></li>
<li>📚 Register to save queries for easy comparison and access to query history</li>
<li>👀 More to come!</li>
</ul>
<h2 id="usage">Usage</h2>
<ul>
<li>Enter your GraphQL endpoint</li>
<li>Submit your queries and view the query response</li>
<li>If your GraphQL server has <a href="https://github.com/apollographql/apollo-tracing">Apollo Tracing</a> enabled, TopoGraphQL will highlight the query response path and display resolver-level response times</li>
<li>Login or register to save your queries and view your query history</li>
</ul>
<h2 id="contributing">Contributing</h2>
<ul>
<li>We welcome all ideas and pull requests!</li>
<li>Future functionality: <ul>
<li>Analytics for data-loader and caching optimization</li>
<li>Support for real-time GraphQL subscriptions</li>
<li>24/7 performance monitoring</li>
</ul>
</li>
</ul>
<h2 id="team">Team</h2>
<ul>
<li>Kevin Sun <a href="github.com/ksun16">@ksun16</a> </li>
<li>Meisze Yau <a href="github.com/mzyau">@mzyau</a></li>
<li>Taylor Quartararo <a href="github.com/t-quartararo">@t-quartararo</a></li>
<li>Dan Chell <a href="github.com/dangchell">@dangchell</a></li>
</ul>

    </div>
  );
};

export default About;
