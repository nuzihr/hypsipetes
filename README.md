# hypsipetes

*hypsipetes*は、レインボーシックスシージのスタッツを綺麗に面白く可視化するためのAPIです。
[R6Tab](https://tabstats.com/siege)のAPIを利用しています。
フロントエンドのサービスから呼び出されることを想定しています。

## To Implement

### 安全にR6Tab APIを呼び出せる

- [x] username -> userid
- [x] userid -> stats

### ユーザーのMMRを比較することができる

- MMR推移グラフ
- いったんユーザーは登録済みにしておいて
- [x] 今シーズンのスコアを反映する

### オペレータ毎にユーザーのスタッツを比較することができる

- [ ] win/kill ratio の散布図

