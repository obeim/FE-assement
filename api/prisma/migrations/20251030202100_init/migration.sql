-- CreateTable
CREATE TABLE "Podcast" (
    "trackId" INTEGER NOT NULL,
    "trackName" TEXT NOT NULL,
    "artistName" TEXT NOT NULL,
    "artworkUrl" TEXT NOT NULL,

    CONSTRAINT "Podcast_pkey" PRIMARY KEY ("trackId")
);

-- CreateTable
CREATE TABLE "SearchTerm" (
    "id" SERIAL NOT NULL,
    "term" TEXT NOT NULL,

    CONSTRAINT "SearchTerm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PodcastToSearchTerm" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PodcastToSearchTerm_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "SearchTerm_term_key" ON "SearchTerm"("term");

-- CreateIndex
CREATE INDEX "_PodcastToSearchTerm_B_index" ON "_PodcastToSearchTerm"("B");

-- AddForeignKey
ALTER TABLE "_PodcastToSearchTerm" ADD CONSTRAINT "_PodcastToSearchTerm_A_fkey" FOREIGN KEY ("A") REFERENCES "Podcast"("trackId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PodcastToSearchTerm" ADD CONSTRAINT "_PodcastToSearchTerm_B_fkey" FOREIGN KEY ("B") REFERENCES "SearchTerm"("id") ON DELETE CASCADE ON UPDATE CASCADE;
