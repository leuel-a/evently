FROM node:20.19-bullseye

## WILL REMOVE THIS IN PRODUCTION
RUN apt update
RUN apt install -y git make ncurses-dev gcc
WORKDIR /usr/src/vim
RUN git clone https://github.com/vim/vim.git . && \
    ./configure \
      --with-features=huge \
      --enable-multibyte \
      --enable-python3interp \
      --prefix=/usr/local && \
    make && \
    make install
## ------------------------------

WORKDIR /app

COPY . .

RUN npm install

ENTRYPOINT ["bash"]
