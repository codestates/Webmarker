#!/bin/bash
# chmod +x db_seed.sh  권한주기
# ./db_seed.sh 로 실행
echo "db 마이그레이션 취소"
npx sequelize-cli db:migrate:undo:all
echo "db 마이그레이션 실행"
npx sequelize-cli db:migrate
echo "db에 시드 추가"
npx sequelize-cli db:seed --seed 20211112071258-demo-user.js
npx sequelize-cli db:seed --seed 20211112070917-demo-folder.js
npx sequelize-cli db:seed --seed 20211112065749-demo-bookmark.js
npx sequelize-cli db:seed --seed 20211112070628-demo-tag.js
npx sequelize-cli db:seed --seed 20211115014241-demo-bookmarks_folder.js
npx sequelize-cli db:seed --seed 20211115014727-demo-bookmarks_tag.js
echo "초기 DB 세팅 끝"
