# README (English)

## Task Team Management Board

A simple **Task Team Management Board** built with **HTML, CSS, and Vanilla JavaScript**.
The application allows users to create team members, add tasks, and assign tasks to different team members using **drag and drop functionality**.

The project demonstrates **DOM manipulation, drag & drop API, and dynamic UI updates** without using any frameworks.

---

## Features

- Create team members dynamically.
- Add tasks to the main task board.
- Drag and drop tasks between:
  - Task board
  - Team members

- Task status management:
  - Not Started
  - Ongoing
  - Finished

- Prevent moving finished tasks.
- Delete tasks.
- Display task count for each team member.
- Display number of unassigned tasks on the board.
- Input validation for team member names.

---

## How It Works

1. When the application starts, the user is asked to **enter team member names separated by commas**.
2. The system creates a **task card for each member**.
3. Tasks can be added to the **main task board**.
4. Tasks can be **dragged and dropped to assign them to team members**.
5. Each task has a **status selector** that updates its state.
6. Finished tasks cannot be moved or deleted.

---

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Drag and Drop API
- DOM Manipulation

---

## Project Structure

```
project
│
├── index.html
├── src
│   ├── main.js
│   └── style.css
```

---

## Validation Rules

- At least one name must be entered.
- Names must be between **3 and 20 characters**.
- Names should be separated using **comma (,)**.

Example:

```
Alice, John, Michael
```

---

## Future Improvements

- Save tasks using LocalStorage
- Add editing tasks
- Add due dates
- Improve UI with animations
- Add dark mode

---

# README (Arabic)

## لوحة إدارة مهام الفريق

هذا المشروع عبارة عن **لوحة لإدارة مهام الفريق** تم تطويرها باستخدام:

- HTML
- CSS
- JavaScript

يتيح التطبيق إنشاء أعضاء فريق، إضافة مهام، وتوزيع المهام بينهم باستخدام **خاصية السحب والإفلات (Drag & Drop)**.

المشروع يوضح استخدام:

- التلاعب بالـ DOM
- Drag & Drop API
- إنشاء عناصر ديناميكية في الصفحة

---

## المميزات

- إنشاء أعضاء الفريق بشكل ديناميكي.
- إضافة مهام إلى لوحة المهام.
- سحب وإفلات المهام بين:
  - لوحة المهام
  - أعضاء الفريق

- إدارة حالة المهمة:
  - Not Started
  - Ongoing
  - Finished

- منع نقل المهام المنتهية.
- حذف المهام.
- عرض عدد المهام لكل عضو في الفريق.
- عرض عدد المهام غير الموزعة.
- التحقق من صحة أسماء أعضاء الفريق.

---

## طريقة العمل

1. عند فتح التطبيق يتم طلب **إدخال أسماء أعضاء الفريق مفصولة بفاصلة (,)**.
2. يتم إنشاء **بطاقة لكل عضو في الفريق**.
3. يمكن إضافة المهام إلى **لوحة المهام الرئيسية**.
4. يمكن **سحب المهمة وإفلاتها لتعيينها لعضو معين**.
5. كل مهمة تحتوي على **حالة يمكن تغييرها**.
6. إذا أصبحت المهمة **Finished** لا يمكن نقلها أو حذفها.

---

## التقنيات المستخدمة

- HTML5
- CSS3
- JavaScript
- Drag & Drop API
- DOM Manipulation

---

## هيكل المشروع

```
project
│
├── index.html
├── src
│   ├── main.js
│   └── style.css
```

---

## قواعد التحقق من الأسماء

- يجب إدخال اسم واحد على الأقل.
- طول الاسم يجب أن يكون بين **3 و 20 حرف**.
- يجب فصل الأسماء باستخدام **فاصلة (,)**.

مثال:

```
Ali, Ahmed, Sara
```

---

## تحسينات مستقبلية

- حفظ المهام باستخدام LocalStorage
- إمكانية تعديل المهام
- إضافة تاريخ للمهمة
- تحسين التصميم
- إضافة الوضع الليلي

---
