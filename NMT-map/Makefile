# -*-makefile-*-
#
# plot available NMT models on a map
# based on OPUS-MT / Tatoeba-MT-Challenge models
#
# other map types:
# https://leaflet-extras.github.io/leaflet-providers/preview/


TATOEBA_VERSIONS = v2020-07-28 v2021-08-07
TATOEBA_VERSION  = ${lastword ${TATOEBA_VERSIONS}}

SRC2TRG_MAPS = 	html/NMT-map/Tatoeba-200/src2trg/index.html \
		html/NMT-map/Tatoeba-all/src2trg/index.html \
		html/NMT-map/Tatoeba-${TATOEBA_VERSION}/src2trg/index.html
TRG2SRC_MAPS = 	html/NMT-map/Tatoeba-200/trg2src/index.html \
		html/NMT-map/Tatoeba-all/trg2src/index.html \
		html/NMT-map/Tatoeba-${TATOEBA_VERSION}/trg2src/index.html

TATOEBA_MT_URL = https://raw.githubusercontent.com/Helsinki-NLP/Tatoeba-Challenge/master

RELEASED_MODELS        = tatoeba-models/released-model-results.txt
RELEASED_MODELS_ALL    = tatoeba-models/released-model-results-all.txt
RELEASED_MODELS_LATEST = tatoeba-models/results/tatoeba-test-${TATOEBA_VERSION}.txt
RELEASED_MODELS_OTHER  = tatoeba-models/results/other.txt
# RELEASED_MODELS_LATEST = tatoeba-models/released-model-results-${TATOEBA_VERSION}.txt
# RELEASED_MODELS_OTHER  = tatoeba-models/released-model-results-other.txt


DOMAINS = 	flores101-dev flores101-devtest tico19 \
		news newstest2009 newstest2010 newstest2011 \
		newstest2012 newstest2013 newstest2014 newstest2015 \
		newstest2016 newstest2017 newstest2018 newstest2019 \
		newstest2020 newstest2021
DOMAIN = ${lastword ${DOMAINS}}


.PHONY: all
all: ${SRC2TRG_MAPS} ${TRG2SRC_MAPS} all-tatoeba all-domains html/NMT-map/index.html

.PHONMY: update
update:
	rm -f ${RELEASED_MODELS}
	rm -f ${RELEASED_MODELS_ALL}
	rm -f ${RELEASED_MODELS_LATEST}
	rm -f ${RELEASED_MODELS_OTHER}
	rm -f html/NMT-map/index.html
	${MAKE} all

.PHONY: all-domain
all-domain: 	html/NMT-map/${DOMAIN}/src2trg/index.html \
		html/NMT-map/${DOMAIN}/trg2src/index.html

.PHONY: all-tatoeba
all-tatoeba:
	for t in ${TATOEBA_VERSIONS}; do \
	  ${MAKE} TATOEBA_VERSION=$$t html/NMT-map/Tatoeba-$$t/src2trg/index.html; \
	  ${MAKE} TATOEBA_VERSION=$$t html/NMT-map/Tatoeba-$$t/trg2src/index.html; \
	done

.PHONY: all-domains
all-domains:
	for d in ${DOMAINS}; do \
	  ${MAKE} DOMAIN=$$d all-domain; \
	done

.PHONY: model-list
model-list: ${RELEASED_MODELS} ${RELEASED_MODELS_ALL}

.PHONY: src2trg-map trg2src-map
src2trg-map: ${SRC2TRG_MAPS}
trg2src-map: ${TRG2SRC_MAPS}

.PHONY: clean
clean:
	rm -f ${SRC2TRG_MAPS} ${TRG2SRC_MAPS}
	rm -f ${RELEASED_MODELS} ${RELEASED_MODELS_ALL}
	rm -f ${RELEASED_LATEST} ${RELEASED_MODELS_OTHER}
	rm -f langid2test_set_size.tsv

.PHONY: install
install:
	git submodule update --init
	cd langinfo && python3 setup.py install --user


## change some language codes to match Glottolog
## TODO: is it ok to move macro language swahili to individual lang swahili?
## TODO: is it ok to map msa to zsm?
## TODO: is it ok to map orm to gaz?
## TODO: is there some better way to do this?

FIX_LANG_CODES = sed	-e 's/^ara\-/arb\-/' \
			-e 's/^arm\-/hye\-/' \
			-e 's/^est\-/ekk\-/' \
			-e 's/^kur_Latn\-/kmr\-/' \
			-e 's/^kur_Arab\-/ckb\-/' \
			-e 's/^fas\-/pes\-/' \
			-e 's/^msa\-/zsm\-/' \
			-e 's/^orm\-/gaz\-/' \
			-e 's/^sqj\-/sqi\-/' \
			-e 's/^swa\-/swh\-/' \
			-e 's/^zho\-/cmn\-/' \
			-e 's/\-ara	/\-arb	/' \
			-e 's/\-arm	/\-hye	/' \
			-e 's/\-est	/\-ekk	/' \
			-e 's/\-kur_Latn	/\-kmr	/' \
			-e 's/\-kur_Arab	/\-ckb	/' \
			-e 's/\-msa	/\-zsm	/' \
			-e 's/\-orm	/\-gaz	/' \
			-e 's/\-fas	/\-pes	/' \
			-e 's/\-sqi	/\-sqj	/' \
			-e 's/\-swa	/\-swh	/' \
			-e 's/\-zho	/\-cmn	/'


WEBPAGE_TITLE = The Tatoeba MT Challenge - Available NMT models
WEBPAGE_TITLE_DOMAIN = The Tatoeba MT Challenge Models - ${DOMAIN} benchmarks

MODEL_ALLMAP_WARNING = <p><b>IMPORTANT NOTE: Some of the test sets used in measuring translation quality are WAY TOO SMALL to be reliable! Some of them include only a few lines of reference translations!</b></p>

MODEL_MAP_WARNING = <p><b>IMPORTANT NOTE: Some of the test sets used in measuring translation quality are very small and will not be reliable! Check the details in the Tatoeba MT Challenge benchmark releases!</b></p>


SRC2TRG_MAP_DESCRIPTION = <p><ul><li>Select a <b>target language</b> from the menu on the top right corner of the map</li> \
<li>The map shows source languages that are supported by <a href="https://github.com/Helsinki-NLP/Tatoeba-Challenge/blob/master/results/tatoeba-results-all.md">available models</a></li> \
<li>Colors indicate the quality on a scale from red (bad) to green (best) measured by chr-F2 scores</li> \
<li>The size of the dot represents the size (i.e. reliability) of the test set</li>\
<li>Click on the dots to get more information about the language pair and to get links for downloading the model</li> \
<li><a href="../../index.html">Maps for other benchmarks</a></li> \
<li>For the opposite translation direction: Click on the <a href="../trg2src/index.html">target language plot</a></li></ul></p>


TRG2SRC_MAP_DESCRIPTION = <p><ul><li>Select a <b>source language</b> from the menu on the top right corner of the map</li> \
<li>The map shows target languages that are supported by <a href="https://github.com/Helsinki-NLP/Tatoeba-Challenge/blob/master/results/tatoeba-results-all.md">available models</a></li> \
<li>Colors indicate the quality on a scale from red (bad) to green (best) measured by chr-F2 scores</li> \
<li>The size of the dot represents the size (i.e. reliability) of the test set</li> \
<li>Click on the dots to get more information about the language pair and to get links for downloading the model</li> \
<li><a href="../../index.html">Maps for other benchmarks</a></li> \
<li>For the opposite translation direction: Click on the <a href="../src2trg/index.html">source language plot</a></li></ul></p>



html/NMT-map/index.html: ${SRC2TRG_MAPS} ${TRG2SRC_MAPS}
	echo '<!DOCTYPE html>' > $@
	echo '<html>'         >> $@
	echo '    <head>'     >> $@
	echo '        <title>The Tatoeba MT Challenge - Benchmarks with available NMT models</title>' >> $@
	echo '    </head>'    >> $@
	echo '    <body>'     >> $@
	echo '      <h1>The Tatoeba MT Challenge - Benchmarks with available NMT models</h1>' >> $@
	echo '<ul>'           >> $@
	echo '<li><a href="Tatoeba-all/src2trg/index.html">Tatoeba test set (all)</li>' >> $@
	echo '<li><a href="Tatoeba-200/src2trg/index.html">Tatoeba test set (>200)</li>' >> $@
	echo '<li><a href="Tatoeba-${TATOEBA_VERSION}/src2trg/index.html">Tatoeba test set (${TATOEBA_VERSION})</li>' >> $@
	for d in ${DOMAINS}; do \
	  echo "<li><a href=\"$$d/src2trg/index.html\">$$d</li>" >> $@; \
	done
	echo '</ul>'          >> $@
	echo '    </body>'    >> $@
	echo '</html>'        >> $@




## fetch list of released models from Tatoeba MT Challenge git

${RELEASED_MODELS} ${RELEASED_MODELS_ALL} ${RELEASED_MODELS_LATEST} ${RELEASED_MODELS_OTHER}:
	mkdir -p ${dir $@}
	wget -O $@ ${TATOEBA_MT_URL}/${patsubst tatoeba-models/%,models/%,$@}

## various maps

html/NMT-map/Tatoeba-200/src2trg/index.html: ${RELEASED_MODELS}
	mkdir -p $(dir $@)
	cat $< | ${FIX_LANG_CODES} |\
	sed 's/\_[a-zA-Z]*//g' |\
	python3 create-map.py > ${@:.html=.json}
	sed -e 's/TO_DIRECTION_/trg/g' \
	    -e 's/FROM_DIRECTION_/srd/g' < create-map-template.js >> ${@:.html=.json}
	cat create-map.html-template |\
	sed -e 's#__TITLE__#${WEBPAGE_TITLE} (source language plot)#' \
	    -e 's#__DESCRIPTION__#${SRC2TRG_MAP_DESCRIPTION}${MODEL_MAP_WARNING}#' \
	    -e 's#__JSONFILE__#${notdir ${@:.html=.json}}#' > $@

html/NMT-map/Tatoeba-200/trg2src/index.html: ${RELEASED_MODELS}
	mkdir -p $(dir $@)
	cat $< | ${FIX_LANG_CODES} |\
	sed 's/\_[a-zA-Z]*//g' |\
	python3 create-map.py -t > ${@:.html=.json}
	sed -e 's/TO_DIRECTION_/src/g' \
	    -e 's/FROM_DIRECTION_/trg/g' < create-map-template.js >> ${@:.html=.json}
	cat create-map.html-template |\
	sed -e 's#__TITLE__#${WEBPAGE_TITLE} (target language plot)#' \
	    -e 's#__DESCRIPTION__#${TRG2SRC_MAP_DESCRIPTION}${MODEL_MAP_WARNING}#' \
	    -e 's#__JSONFILE__#${notdir ${@:.html=.json}}#' > $@


html/NMT-map/Tatoeba-all/trg2src/index.html: ${RELEASED_MODELS}
	mkdir -p $(dir $@)
	cat $< | ${FIX_LANG_CODES} |\
	sed 's/\_[a-zA-Z]*//g' |\
	python3 create-map.py -t > ${@:.html=.json}
	sed -e 's/TO_DIRECTION_/src/g' \
	    -e 's/FROM_DIRECTION_/trg/g' < create-map-template.js >> ${@:.html=.json}
	cat create-map.html-template |\
	sed -e 's#__TITLE__#${WEBPAGE_TITLE} (target language plot)#' \
	    -e 's#__DESCRIPTION__#${TRG2SRC_MAP_DESCRIPTION}${MODEL_ALLMAP_WARNING}#' \
	    -e 's#__JSONFILE__#${notdir ${@:.html=.json}}#' > $@

html/NMT-map/Tatoeba-all/src2trg/index.html: ${RELEASED_MODELS_ALL}
	mkdir -p $(dir $@)
	cat $< | ${FIX_LANG_CODES} |\
	sed 's/\_[a-zA-Z]*//g' |\
	python3 create-map.py > ${@:.html=.json}
	sed -e 's/TO_DIRECTION_/trg/g' \
	    -e 's/FROM_DIRECTION_/src/g' < create-map-template.js >> ${@:.html=.json}
	cat create-map.html-template |\
	sed -e 's#__TITLE__#${WEBPAGE_TITLE} (source language plot)#' \
	    -e 's#__DESCRIPTION__#${SRC2TRG_MAP_DESCRIPTION}${MODEL_ALLMAP_WARNING}#' \
	    -e 's#__JSONFILE__#${notdir ${@:.html=.json}}#' > $@



html/NMT-map/Tatoeba-${TATOEBA_VERSION}/trg2src/index.html: ${RELEASED_MODELS_LATEST}
	mkdir -p $(dir $@)
	cat $< | cut -f1,3- | ${FIX_LANG_CODES} |\
	sed 's/\_[a-zA-Z]*//g' |\
	python3 create-map.py -t > ${@:.html=.json}
	sed -e 's/TO_DIRECTION_/src/g' \
	    -e 's/FROM_DIRECTION_/trg/g' < create-map-template.js >> ${@:.html=.json}
	cat create-map.html-template |\
	sed -e 's#__TITLE__#${WEBPAGE_TITLE} (target language plot)#' \
	    -e 's#__DESCRIPTION__#${TRG2SRC_MAP_DESCRIPTION}${MODEL_ALLMAP_WARNING}#' \
	    -e 's#__JSONFILE__#${notdir ${@:.html=.json}}#' > $@

html/NMT-map/Tatoeba-${TATOEBA_VERSION}/src2trg/index.html: ${RELEASED_MODELS_LATEST}
	mkdir -p $(dir $@)
	cat $< | cut -f1,3- | ${FIX_LANG_CODES} |\
	sed 's/\_[a-zA-Z]*//g' |\
	python3 create-map.py > ${@:.html=.json}
	sed -e 's/TO_DIRECTION_/trg/g' \
	    -e 's/FROM_DIRECTION_/src/g' < create-map-template.js >> ${@:.html=.json}
	cat create-map.html-template |\
	sed -e 's#__TITLE__#${WEBPAGE_TITLE} (source language plot)#' \
	    -e 's#__DESCRIPTION__#${SRC2TRG_MAP_DESCRIPTION}${MODEL_ALLMAP_WARNING}#' \
	    -e 's#__JSONFILE__#${notdir ${@:.html=.json}}#' > $@


html/NMT-map/${DOMAIN}/trg2src/index.html: ${RELEASED_MODELS_OTHER}
	mkdir -p $(dir $@)
	grep '${DOMAIN}	' $< | cut -f1,3- | ${FIX_LANG_CODES} |\
	sed 's/\_[a-zA-Z]*//g' |\
	python3 create-map.py -t > ${@:.html=.json}
	sed -e 's/TO_DIRECTION_/src/g' \
	    -e 's/FROM_DIRECTION_/trg/g' < create-map-template.js >> ${@:.html=.json}
	cat create-map.html-template |\
	sed -e 's#__TITLE__#${WEBPAGE_TITLE_DOMAIN} (target language plot)#' \
	    -e 's#__DESCRIPTION__#${TRG2SRC_MAP_DESCRIPTION}#' \
	    -e 's#__JSONFILE__#${notdir ${@:.html=.json}}#' > $@

html/NMT-map/${DOMAIN}/src2trg/index.html: ${RELEASED_MODELS_OTHER}
	mkdir -p $(dir $@)
	grep ${DOMAIN} $< | cut -f1,3- | ${FIX_LANG_CODES} |\
	sed 's/\_[a-zA-Z]*//g' |\
	python3 create-map.py > ${@:.html=.json}
	sed -e 's/TO_DIRECTION_/trg/g' \
	    -e 's/FROM_DIRECTION_/src/g' < create-map-template.js >> ${@:.html=.json}
	cat create-map.html-template |\
	sed -e 's#__TITLE__#${WEBPAGE_TITLE_DOMAIN} (source language plot)#' \
	    -e 's#__DESCRIPTION__#${SRC2TRG_MAP_DESCRIPTION}#' \
	    -e 's#__JSONFILE__#${notdir ${@:.html=.json}}#' > $@






NMT-map-src2trg-all.html: ${RELEASED_MODELS_ALL} # langid2test_set_size.tsv
	sed 's/\_[a-zA-Z]*//g' < $< |\
	python3 create-map.py > ${@:.html=.json}
	sed -e 's/TO_DIRECTION_/trg/g' \
	    -e 's/FROM_DIRECTION_/src/g' < create-map-template.js >> ${@:.html=.json}
	cat create-map.html-template |\
	sed -e 's#__TITLE__#Tatoeba MT Challenge - Available NMT models (source language plot)#' \
	    -e 's#__DESCRIPTION__#${SRC2TRG_MAP_DESCRIPTION}${MODEL_ALLMAP_WARNING}#' \
	    -e 's#__JSONFILE__#${@:.html=.json}#' > $@

NMT-map-trg2src-all.html: ${RELEASED_MODELS_ALL} # langid2test_set_size.tsv
	sed 's/\_[a-zA-Z]*//g' < $< |\
	python3 create-map.py -t > ${@:.html=.json}
	sed -e 's/TO_DIRECTION_/src/g' \
	    -e 's/FROM_DIRECTION_/trg/g' < create-map-template.js >> ${@:.html=.json}
	cat create-map.html-template |\
	sed -e 's#__TITLE__#Tatoeba MT Challenge - Available NMT models (target language plot)#' \
	    -e 's#__DESCRIPTION__#${TRG2SRC_MAP_DESCRIPTION}${MODEL_ALLMAP_WARNING}#' \
	    -e 's#__JSONFILE__#${@:.html=.json}#' > $@


