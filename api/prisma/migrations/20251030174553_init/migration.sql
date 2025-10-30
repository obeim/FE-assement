-- CreateTable
CREATE TABLE "Podcast" (
    "trackId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "trackName" TEXT NOT NULL,
    "artistName" TEXT NOT NULL,
    "artworkUrl" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SearchTerm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "term" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PodcastToSearchTerm" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PodcastToSearchTerm_A_fkey" FOREIGN KEY ("A") REFERENCES "Podcast" ("trackId") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PodcastToSearchTerm_B_fkey" FOREIGN KEY ("B") REFERENCES "SearchTerm" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "SearchTerm_term_key" ON "SearchTerm"("term");

-- CreateIndex
CREATE UNIQUE INDEX "_PodcastToSearchTerm_AB_unique" ON "_PodcastToSearchTerm"("A", "B");

-- CreateIndex
CREATE INDEX "_PodcastToSearchTerm_B_index" ON "_PodcastToSearchTerm"("B");
