# Git 协作规范

## 分支管理

```
master (主分支 - 仅稳定版本)
  └── feat/* (功能开发分支)
  └── fix/*  (Bug 修复分支)
  └── docs/* (文档更新分支)
```

## 开发流程

1. **创建分支**
   ```bash
   git checkout -b feat/功能描述
   ```

2. **开发提交**
   ```bash
   git add .
   git commit -m "feat: 描述清楚做了什么"
   git push origin feat/功能描述
   ```

3. **提交 PR**
   - GitHub 上创建 Pull Request
   - 填写清晰的 PR 描述
   - 等待 Code Review

4. **合并到 master**
   - Review 通过后合并
   - 删除已合并的分支

## 分支命名示例

| 类型 | 命名格式 | 示例 |
|------|----------|------|
| 功能 | `feat/<描述>` | `feat/level2-curriculum` |
| 修复 | `fix/issue-<编号>-<描述>` | `fix/issue-12-snake-bug` |
| 文档 | `docs/<描述>` | `docs/add-api-examples` |
| 重构 | `refactor/<描述>` | `refactor/game-engine` |

## 提交信息规范

```
feat: 新增 Level 2 第一关课程
fix: 修复贪吃蛇碰撞检测 bug
docs: 更新 README 安装说明
refactor: 重构游戏引擎架构
```

## ⚠️ 安全红线

- **严禁**在 master 直接开发
- **严禁**提交敏感文件 (AGENTS.md, SOUL.md, .openclaw/ 等)
- **必须** Code Review 后才能合并
- **推送前**必须 `git status` 检查
