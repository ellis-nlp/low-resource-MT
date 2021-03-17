
# NMT maps

Creating maps of available NMT models.

This repository provides scripts that plot information about available NMT models and languages they support on a world map with colors indicating the quality of the model based on BLEU scores (from red to green). It supports plots that show that source language that can be translated to selected target languages or vice versa.

Coordinates are taken from glottolog and will be retrieved from the glottolog database using the langinfo python library (see below).


## Prerequisites and installation

* langinfo with glottolog info: https://github.com/robertostling/langinfo

Install prerequisites by running

```
make install
```


## Usage


* fetch list of released models
* create maps that plot according to the supported source language of NMT models
* create maps that plot according to the supported target language of NMT models

```
make model-list
make src2trg-map
make trg2src-map
```

or simple make it all:

```
make all
```

If everything works as expected then you should obtain HTML pages that show maps like the ones here: https://opus.nlpl.eu/OPUS-MT/


## TODO

* make the language selection in the legend more obvious
* sort the languages in the legend
* initialize the map with only one target/source language
* legend for the color scale
* support other benchmarks than the Tatoeba benchmark
* colored background maps (see http://leaflet-extras.github.io/leaflet-providers/preview/)
* ...
