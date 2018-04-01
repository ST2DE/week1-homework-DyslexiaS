# Git
Git為分散式版本控制系統


## **設定**
    $ git config --global user.name "DyslexiaS"
    $ git config --global user.email "exist02593@gmail.com"
- 加上 `--global` 表示是全域的設定
- 使用 `git config --list`這個指令來看你的 Git 設定內容：
    $ git config --list
        user.name=DyslexiaS
        user.email=exist02593@gmail.com
- Git 的設定檔儲存在家目錄的.gitconfig 隱藏檔中，可以直接打開編輯
- Git 有提供alias的功能可以自己設定，例如將`git status` 縮寫成 `git st` 
    $ git config --global alias.st status
- 使 Git 輸出時加上顏色
    $ git config --global color.ui true


## **基本語法及操作**
-  `git init` : 建立新的 Repository
-  `git clone` : 複製別人的 Repository
  - 如果想要更改檔名，只要在網址後面打上更改的名稱
## **staged****,status, add, commit, log, .gitignore**
- staged
  - 檔案會有4種不同的檔案狀態
  - `未追蹤(Untracked files)`：在版本提交後才`又加進來`的檔案，這些檔案並沒有被GIT所追蹤控管
  - `已更改(Changes not staged for commit)`：已提交版本後，卻又再次修改，這些檔案會被`丟回`工作目錄(WD)
  - `等待提交(Changes to be committed)`：在工作目錄(WD)的檔案執行`git add`後，會放在暫存區(Stage)。這些放在暫存區的檔案狀態便是`等待提交`囉！
  - `已提交(Committed)`：在暫存區(Stage)的檔案執行`git commit`後，檔案便置於儲存區(Repo)，這些放在儲存區的檔案即是`已提交`的狀態。
- `git status`來檢查目前 Git 的狀態
  - `git diff` 可以看到所有追蹤檔案被修改的內容
  - `git diff file` 可以看到該檔案被修改的內容
- `git add` 
  - 新增的file會是Untracked files (未被追蹤的檔案)，使用 `git add` 把它加入追蹤
  -  `git add .` 或是 `-A` `--all`可以一次add所有的file
  - `git add -i` 使用互動模式，可以方便的選擇要加入的檔案，或是移除剛剛不小心加入的檔案 (revert)
  - `git add -u` add修改部分
- `git commit`
  - 讓未來想要回溯時可以選擇的節點
  - `git commit -m "message"` 不啟動文字模式提交
  - `git commit -m <title> -m <msg1> -m <msg2> ....` 一次提交多個 msg
  - `git log` 檢視提交歷史訊息
  - `git show <commit_id>` 檢視提交的patch所修改內容 (給後六碼就可以)例如 : `git show 497f7c`
  -  `git reset --soft HEAD^` 回到上一步(重新commit)
- `git cherry-pick <commit id>` 挑入 patch
  - 想要把 P4移除
  - 先`git reset --hard`回到 P3
  - 再把 P4 後面的接到 P3 之後
  - `git revert <commit id>` 還原指定的 patch
- `git reset`
  - 後面加上 `HEAD` 表示回復到目前所在patch (檔案的狀態改變)
  - `HEAD^` `HEAD~1` 回復到上1個
  - `HEAD^^` `HEAD~2`回復到上2個
  - 加上 `--hard` 表示強制清除修改內容
  -  `git reset --hard <commit id>` 直接 reset 成指定的 patch


## **branch、checkout、tag**
- Git branch
  - 多人專案開發過程中，開發新功能時會從主分支開出一條新的分支來做修改，修改或開發完成後再 merge回主分支
  - `git branch` 列出所有以及現在所在的branch
  - `git branch moose` 會開出新的branch名稱叫moose
  - `git checkout moose` 可以切換到moose的branch
  - `git push origin --delete <branchName>` 刪除分支
  - 或是傳送空的分支: `git push origin :<branchName>`
- Git tag
  - 在專案裡隨意新增tag，方便記錄訊息
  - `git tag -l` 列出所有 tag
  - `git tag -l 'v1.4.2.*'` 列出開頭相同的 tag
  - 新增 tag
    - `git tag -a v1.4 -m 'my version 1.4'`
    - `-a` 為標籤名稱
    - `-m` 為標籤說明
  - `git show` 可以顯示標籤說明以及commit
  - `git tag -a v1.2 7c5f24d` 針對很久以前的commit進行標籤
  - 上傳標籤到遠端
    - git push 並不會把標籤上傳到遠端
    - `git push origin v1.5` 
    - `git push origin --tags` 一次上傳所有
  - 遠端刪除
    - `git push origin :refs/tags/<tagname>`
    - `git tag -d <tagname>`
  - 其他功能
    - 針對某 tag 跟其他commit 做比較
      `git diff` `v2.5 1b2e1d63ff`
    - 比較現在與某 tag
      `git diff` `v2.5 HEAD`
    - 搜尋標籤裡是含有 hello 字串
      `git grep` `"hello"` `v2.5`
## **merge、fast-forward、conflict**
- `git merge <branch name>` 合併分支
    master 要去合併 moose 分支
    git checkout master
    git merge moose
  - 合併完之後會多出一個 merge patch ，紀錄2分支的 commit id，也就是原始兩個 branch 的頭
  - merge後紀錄的 node 會被重新按照 提交時間 來排序 (會保留原本 commit id)
  -  `git show --pretty=raw` 可以看到有2個 parent
- fast-forward
  - 如果其中一個分支是另一個分支的子集時，不會出現 merge patch，因為`feature` 跟 `master` 根本就在同一條分支上
![master 是 feature 的子集](https://d2mxuefqeaa7sj.cloudfront.net/s_BB51719A7DD125D6B58F12DA310E66026A32817749EAB50DB703B73C8A61DB7E_1520164994453_image.png)

  - `git merge --no-ff <branch name>` 強制產生 merge patch
- `[git rebase](https://git-scm.com/book/zh-tw/v1/Git-%E5%88%86%E6%94%AF-%E5%88%86%E6%94%AF%E7%9A%84%E8%A1%8D%E5%90%88)`
  - 當一次 rebase 多個 patch 的時候，其實就是連續做 cherry-pick 的動作
  - 當我們想要merge的時候，master branch 可能已經有其他merge回去的內容了，因此使用`git rebase` 將某一支 branch 基於另一支 branch 的內容合併起來
  - 把moose 分支接到 master 後面
    $ git checkout moose
    $ git rebase master
    //同等於 git rebase <new base> <branch name>
    $ git rebase master moose
  - Merge 與 Rebase [比較](https://zlargon.gitbooks.io/git-tutorial/content/branch/merge.html)
- Conflict
  - 當合併發生衝突時，到該檔案手動修改內容，修改完之後再重新 add 和 commit
    <<<<<<<<<< HEAD 
    中間區域是目前你所在 branch 的 commit 內容
    ========== 
    要合併的 cat branch 的內容
    >>>>>>>>>>> moose 
  - 修改後要將 <<< === >>> 刪除
  
## **與GitHub連動**

Repository 的 URL，分成 ***HTTPS*** 和 ***SSH*** 兩種
***HTTPS***：每次上傳 code 到 Github 的時候，都要輸入一次 username、password
***SSH***：只要設定好一次之後，就不用再輸入帳號/密碼了


## **remote**
- `git remote add <short name> <repo url>` 新增遠端 repository URL
- `git remote -v` 查看 remote 資訊
- `git push origin master` 傳到github上


## **fetch**

將遠端儲存庫的最新版下載回來(**不包含**「合併」分支的動作)

- `git fetch <remote name>` 一次更新一個 remote
- `git fetch --all` 一次更新所有


## **push、pull**
- `git push` 將本地儲存庫中目前分支的所有相關物件**推送**到遠端儲存庫中
  - `-u` 將遠端數據庫的分支設為追蹤目標
- `git pull` 完全相等於以下兩段指令：
    git fetch
    git merge origin/master


## **Git Flow 團隊開發模式**

Git Flow 的概念就是將主要的 branch 分為 `master`和`develop`，master就是最後的發佈版本，所有維護者在發佈前的都是對develop進行操作，這樣就不會讓發佈版本的 branch 看起來過度雜亂。[安裝](https://github.com/nvie/gitflow)

## 主要分支
- master：釋出的版本，只從 release 與 hotfix merge  回來，不直接在上面 commit 變更。
- develop：開發中的版本，預設在這 branch 上，開發修改功能都從這分支出去。
## 支援性分支
- Feature：從 develop 分支出來，當功能開發修改完成後 merge 回 develop
    git checkout develop          //切換到develop
    git merge --no-ff myfeature   //合併分支
    git branch -d myfeature       //刪除分支
    git push origin develop       //上傳資料
  - `--no-ff` 不會將原本的commit log 合併成一條，會記錄分支操作步驟


- Release：從 develop 分支出來，是準備釋出的版本，只修改版本號與 bug，完成後 merge 回 develop 與 master，並在 master 標上版本號的 tag
    git checkout -b release-1.3 develop    //從 develop 開新分支 release-1.3
    git commit -a -m "Update: release 1.3" //經過一堆 commit message
    git checkout master                    //切回主分支 master
    git merge --no-ff release-1.3          //master 合併 release-1.3 分支
    git tag -a v1.3 -m "Release v1.3 Tag"  //在 master 上面加上新 tag
    git checkout develop                   //切換到 develop 分支
    git merge --no-ff release-1.3          // merge release-1.3
    git push
    git branch -d release-1.3


- Hotfix：從 master 分支出來，主要是處理已釋出版本需要立即修改的錯誤，完成後 merge 回 develop 與 master，並在 master 標上版本號的 tag



![](https://d2mxuefqeaa7sj.cloudfront.net/s_0D2AF13D23A62DEDFD00B0DDF557533151EAF11E5057FC74187D9F7F51C2D139_1522544402115_image000.png)


在開發網頁或是網路應用程式的時候，往往都有可能會使用Web API來對伺服器溝通，而跟在撰寫API時可以用瀏覽器來確認API的結果，但是假如需要進行不同POST、GET、PUT或DELETE不同method，或是API流程上進行測試時，瀏覽器就不會是個方便工具，本篇介紹一個工具POSTMAN可以讓開發API更加容易。(擷取網路)


## 基本操做
- 創建Collection
- 創建一個Request (放在Collection)
- 選擇 method
- 輸入API的URL
  - 點選URL右邊的Params可以設定Request的參數
- 送出後會在視窗下方顯示Request回應的結果

