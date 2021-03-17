# -*-makefile-*-
#
# plot available NMT models on a map
# based on OPUS-MT / Tatoeba-MT-Challenge models
#

SRC2TRG_MAPS = NMT-map-src2trg.html NMT-map-src2trg-all.html
TRG2SRC_MAPS = NMT-map-trg2src.html NMT-map-trg2src-all.html

TATOEBA_MT_URL = https://raw.githubusercontent.com/Helsinki-NLP/Tatoeba-Challenge/master

RELEASED_MODELS     = tatoeba-models/released-model-results.txt
RELEASED_MODELS_ALL = tatoeba-models/released-model-results-all.txt


.PHONY: all
all: ${SRC2TRG_MAPS} ${TRG2SRC_MAPS}

model-list: ${RELEASED_MODELS} ${RELEASED_MODELS_ALL}

.PHONY: src2trg-map trg2src-map
src2trg-map: ${SRC2TRG_MAPS}
trg2src-map: ${TRG2SRC_MAPS}

clean:
	rm -f ${SRC2TRG_MAPS} ${TRG2SRC_MAPS}
	rm -f ${RELEASED_MODELS} ${RELEASED_MODELS_ALL}
	rm -f langid2test_set_size.tsv

install:
	git submodule update --init
	cd langinfo && python3 setup.py install --user




MODEL_ALLMAP_WARNING = <p><b>IMPORTANT NOTE: Some of the test sets used in measuring translation quality are WAY TOO SMALL to be reliable! Some of them include only a few lines of reference translations!</b></p>

MODEL_MAP_WARNING = <p><b>IMPORTANT NOTE: Some of the test sets used in measuring translation quality are very small and will not be reliable! Check the details in the Tatoeba MT Challenge benchmark releases!</b></p>

SRC2TRG_MAP_DESCRIPTION = <p>Available translation models for various language pairs. Colors indicate the quality on a scale from red (bad) to green (best) measured by chr-F2 scores. Click on the dots to get more information about the language pair and to get links for downloading the model.</p> \
	<p>The dots on the map indicate the source language. Select the target language from the menu in the upper-right corner of the map.</p>

TRG2SRC_MAP_DESCRIPTION = <p>Available translation models for various language pairs. Colors indicate the quality on a scale from red (bad) to green (best) measured by chr-F2 scores. Click on the dots to get more information about the language pair and to get links for downloading the model.</p> \
	<p>The dots on the map indicate the target language. Select the source language from the menu in the upper-right corner of the map.</p>



## fetch list of released models from Tatoeba MT Challenge git

${RELEASED_MODELS}:
	mkdir -p ${dir $@}
	wget -O $@ ${TATOEBA_MT_URL}/models/${notdir $@}

${RELEASED_MODELS_ALL}:
	mkdir -p ${dir $@}
	wget -O $@ ${TATOEBA_MT_URL}/models/${notdir $@}

dataset-info:
	wget -O datasets.md ${TATOEBA_MT_URL}/Data.md
	cut -f2 --delimiter="|" --only-delimited < datasets.md | \
	    egrep --only-matching "\[[[:lower:]]+-[[:lower:]]+\]" | tr -d '[]' > langids.txt
	cut -f3 --delimiter="|" --only-delimited < datasets.md | \
	    egrep --only-matching "[[:digit:]]+" > test_set_sizes.txt
	paste langids.txt test_set_sizes.txt > langid2test_set_size.tsv
	rm datasets.md langids.txt test_set_sizes.txt

## various maps

NMT-map-src2trg-all.html: ${RELEASED_MODELS_ALL} dataset-info
	sed 's/\_[a-zA-Z]*//g' < $< |\
	python3 create-map.py > ${@:.html=.json}
	sed -e 's/TO_DIRECTION_/trg/g' \
	    -e 's/FROM_DIRECTION_/src/g' < create-map-template.js >> ${@:.html=.json}
	cat create-map.html-template |\
	sed -e 's#__TITLE__#Tatoeba MT Challenge - Pre-trained NMT models (source language plot)#' \
	    -e 's#__DESCRIPTION__#${SRC2TRG_MAP_DESCRIPTION}${MODEL_ALLMAP_WARNING}#' \
	    -e 's#__JSONFILE__#${@:.html=.json}#' > $@

NMT-map-trg2src-all.html: ${RELEASED_MODELS_ALL} dataset-info
	sed 's/\_[a-zA-Z]*//g' < $< |\
	python3 create-map.py -t > ${@:.html=.json}
	sed -e 's/TO_DIRECTION_/src/g' \
	    -e 's/FROM_DIRECTION_/trg/g' < create-map-template.js >> ${@:.html=.json}
	cat create-map.html-template |\
	sed -e 's#__TITLE__#Tatoeba MT Challenge - Pre-trained NMT models (target language plot)#' \
	    -e 's#__DESCRIPTION__#${TRG2SRC_MAP_DESCRIPTION}${MODEL_ALLMAP_WARNING}#' \
	    -e 's#__JSONFILE__#${@:.html=.json}#' > $@

NMT-map-src2trg.html: ${RELEASED_MODELS} dataset-info
	sed 's/\_[a-zA-Z]*//g' < $< |\
	python3 create-map.py > ${@:.html=.json}
	sed -e 's/TO_DIRECTION_/trg/g' \
	    -e 's/FROM_DIRECTION_/srd/g' < create-map-template.js >> ${@:.html=.json}
	cat create-map.html-template |\
	sed -e 's#__TITLE__#Tatoeba MT Challenge - Pre-trained NMT models (source language plot)#' \
	    -e 's#__DESCRIPTION__#${SRC2TRG_MAP_DESCRIPTION}${MODEL_MAP_WARNING}#' \
	    -e 's#__JSONFILE__#${@:.html=.json}#' > $@

NMT-map-trg2src.html: ${RELEASED_MODELS} dataset-info
	sed 's/\_[a-zA-Z]*//g' < $< |\
	python3 create-map.py -t > ${@:.html=.json}
	sed -e 's/TO_DIRECTION_/src/g' \
	    -e 's/FROM_DIRECTION_/trg/g' < create-map-template.js >> ${@:.html=.json}
	cat create-map.html-template |\
	sed -e 's#__TITLE__#Tatoeba MT Challenge - Pre-trained NMT models (target language plot)#' \
	    -e 's#__DESCRIPTION__#${TRG2SRC_MAP_DESCRIPTION}${MODEL_MAP_WARNING}#' \
	    -e 's#__JSONFILE__#${@:.html=.json}#' > $@
