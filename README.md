# Trello_Practice

**Trello Clone**
這個專案複製了 Trello 的一些基本功能。它允許使用者建立看板、新增清單以及在清單中管理任務。


**Trello 成品**

![Trello 成品](https://user-images.githubusercontent.com/33803176/254138109-2ccabdda-f34a-464a-998b-36cee02b8e9e.png)

**Trello 卡片編輯**


![Trello 卡片編輯](https://user-images.githubusercontent.com/33803176/254138120-bb2bdeee-fdb7-42e3-898f-55172d98156c.png)

**簡易 rwd**

![簡易 rwd](https://user-images.githubusercontent.com/33803176/254138128-a91d98b3-ec2a-4e69-8f5f-602584e89b1a.png)

**功能**

### 添加卡片
- 使用者可以在每個 List 的底部找到一個「+ 添加卡片」按鈕。
- 點擊後，會觸發 JavaScript 事件，創建一個新的卡片元素。
- 使用 `contenteditable` 屬性讓卡片可編輯。
- 透過 `keydown` 事件來偵測 Enter 鍵，以保存卡片的標題。

### 添加 List
- 在畫面底部有一個「+ 添加列表」按鈕。
- 點擊後會觸發 JavaScript，創建一個新的 List 容器。
- 新的 List 容器也具備添加卡片的功能。

### 卡片詳情（Modal）
- 點擊任一卡片會出現一個模態窗口。
- 模態窗口內可以編輯卡片的詳細信息和評論。
- 使用 LocalStorage 來儲存卡片的詳細信息。

### 拖放功能
- 卡片支持拖放功能。
- 使用 `dragstart`, `dragover`, `dragenter` 和 `drop` 等原生 DnD API。
- 實現卡片在 List 之間以及在同一個 List 內的排序。


**使用的技術**
- HTML
- CSS
- JavaScript DOM






