-- CreateTable
CREATE TABLE "Components" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "component" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ComponentText" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "identifier" TEXT,
    "componentId" INTEGER NOT NULL,
    CONSTRAINT "ComponentText_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Components" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ComponentMedia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "media" BLOB NOT NULL,
    "description" TEXT,
    "identifier" TEXT,
    "componentId" INTEGER NOT NULL,
    CONSTRAINT "ComponentMedia_componentId_fkey" FOREIGN KEY ("componentId") REFERENCES "Components" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
