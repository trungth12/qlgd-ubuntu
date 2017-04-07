with (import <nixpkgs> {});

let 
    rubyenv = bundlerEnv {
        name = "rb";
        inherit ruby_2_4;
        gemfile = ./Gemfile;
        lockfile = ./Gemfile.lock;
        gemset = ./gemset.nix;
    };

in stdenv.mkDerivation {
     name = "MyProject";
     version = "0.0.1";

     buildInputs = [
        stdenv
        git
        # ruby deps
        ruby_2_4
        bundler
        # Rails deps
        clang
        libxml2
        libxslt
        readline
        sqlite
        openssl
        rubyenv
        postgresql
        mysql
        openjdk7
        redis
     ];

     shellHook = ''
        export LIBXML2_DIR=${pkgs.libxml2}
        export LIBXSLT_DIR=${pkgs.libxslt}
     '';
   }
