APP_DEST=release
ELECTRON_PREBUILT=electron/electron/dist
ELECTRON_DIR=electron
RES_DIR=$(APP_DEST)/Electron.app/Contents/Resources/app
REACT_DIR=react-app

dist: $(APP_DEST)
	rsync -a $(ELECTRON_PREBUILT)/ $(APP_DEST)
	rsync -a --exclude='*~' \
	          --exclude='bookmanager.js' \
		      --exclude='json-store.js' \
	          --exclude='config.json' \
              --exclude='Makefile' \
              --exclude='electron' \
              --exclude='public' \
              $(ELECTRON_DIR)/ $(RES_DIR)/
	cp -a bookmanager/*.js $(RES_DIR)/
	cp -a config.json.release $(RES_DIR)/config.json
	rsync -a $(REACT_DIR)/build/ $(RES_DIR)/public/

$(APP_DEST):
	mkdir -p $(APP_DEST)

