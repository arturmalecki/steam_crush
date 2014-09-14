namespace :compile do
  desc 'Compile game for website'
  task :website do
    print 'Compiling game for website... '
    system('bundle exec sprockets -I . --js-compressor uglify ./src/javascripts/app_production.js > ./dist/website/app.min.js')
    puts '[DONE]'
  end

  desc 'Compile game for mobile'
  task :mobile do
    print 'Compiling game for mobile... '
    system('mkdir -p ./tmp/mobile && rm -rf ./tmp/mobile/*')
    system('bundle exec sprockets -I . --js-compressor uglify ./src/javascripts/app_production.js > ./tmp/mobile/app.min.js')
    system('cp -r ./src/assets ./tmp/mobile/ && cp ./src/index_mobile.html ./tmp/mobile/index.html')
    system('cd ./tmp/mobile && zip -rq ../../dist/mobile/memoryz_mobile.zip * && cd ../../')
    puts '[DONE]'
  end

  desc 'Compile for all platforms'
  task :all => [:website, :mobile]
end
