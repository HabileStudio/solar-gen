<?php require('head.php'); ?>

	<title></title>

</head>

<body>
  <div id="interface">
    <!-- <div class="layer">
      <h1>{Layer name}</h1>
      <div class="slider">
        <h2>{Property.name}</h2>
        <input
          type="range"
          min="10"
          max="1000"
          step="10"
          value="{Property.value}"
          data-orientation="vertical"
          id="{Property.name}"
        >
      </div>
    </div> -->
  </div>

  <div id="drawing">

  </div>


  <div id="export">
    <a href=""
       id="export-link">
      <span class="button"></span>
      SVG >>
    </a>
    <a href=""
       id="export-settings">
      <span class="button"></span>
      Export >>
    </a>
    <a href=""
       id="import-settings">
      <span class="button"></span>
      >> Import
    </a>
    <a href=""
       id="randomize">
      <span class="button"></span>
      Randomize
    </a>
  </div>


  <div id="export-window"
       class="hidden">
    <a href=""
      class="close">
      <strong>X</strong>
    </a>
    <p>
     Copy your settings and save them somewhere.
    </p>
    <!-- here are generated the exported settings -->
    <textarea id="export-content"></textarea>
  </div>

  <div id="import-window"
       class="hidden">
    <a href=""
      class="close">
      <strong>X</strong>
    </a>
    <p>
     Paste your settings here and click "import".
    </p>
    <!-- here the user copy-pastes settings to import -->
    <textarea id="import-content"></textarea>
    <button id="submit-import">Import</button>
  </div>

</body>

</html>