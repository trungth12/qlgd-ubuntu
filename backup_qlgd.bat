set PGPASSWORD=hpu qtm qlgd
set hour=%time:~0,2%
if "%time:~0,1%"==" " set hour=0%time:~1,1%
set folder_name=qlgd20152016hk2
set file_name=%folder_name%_%date:~10,4%%date:~4,2%%date:~7,2%_%hour%%time:~3,2%.backup
set backup_folder=\\10.1.0.208\DatabaseBackup\qlgd\%folder_name%\

E:\PostgreSQL\9.3\bin\pg_dump.exe --host localhost --port 5432 --username "postgres" --role "qlgd" --format custom --blobs --verbose --file "E:\dbbackup\qlgd\%folder_name%\%file_name%" "%folder_name%"

xcopy "E:\dbbackup\qlgd\%folder_name%\%file_name%" "%backup_folder%"