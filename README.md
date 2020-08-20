# hypsipetes

*hypsipetes*は、レインボーシックスシージのスタッツを綺麗に面白く可視化するためのAPIです。
[R6Tab](https://tabstats.com/siege)のAPIを利用しています。
フロントエンドのサービスから呼び出されることを想定しています。

## To Implement

### 安全にR6Tab APIを呼び出せる

- [x] username -> userid
- [x] userid -> stats

### ユーザーのMMR/キルレの推移を比較することができる

- [x] MMR/キルレ推移グラフ
- [x] いったんユーザーは登録済みにしておく
- [x] 今シーズンのスコアを反映する

### オペレータ毎にユーザーのスタッツを比較することができる

- [x] win/kill ratio の散布図
- [ ] シーズンの散布図

### データ更新ボタン

- [ ] 