@echo off
del "E:\qlgd-test_octopus\tmp\pids\server.pid"
C:
cd E:\qlgd-test_octopus
set RAILS_ENV=production
bundle exec rake assets:precompile