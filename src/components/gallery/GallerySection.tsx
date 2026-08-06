import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import projects from "@/lib/Projects.json";
import { eventGalleryItems } from "@/lib/galleryData";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FolderOpen, Image as ImageIcon } from "lucide-react";

interface GallerySectionProps {
  limit?: number;
}

type GalleryTab = "projects" | "office-life";

type ProjectGalleryItem = {
  id: string;
  title: string;
  src: string;
};

type OfficeLifeGalleryItem = {
  id: string;
  src: string;
};

const officeLifeLocation = "Blue Lagoon";
const officeLifeDate = "Jan 3rd, 2026";

export const GallerySection: React.FC<GallerySectionProps> = ({
  limit,
}) => {
  const [activeTab, setActiveTab] = useState<GalleryTab>("projects");
  const [isOfficeLifeOpen, setIsOfficeLifeOpen] = useState(false);

  const projectItems = useMemo(
    () =>
      (projects as Array<{
        title: string;
        image?: string;
        images?: string[];
      }>).map((project, index) => ({
        id: `project-${index}`,
        title: project.title,
        src: project.image ?? project.images?.[0] ?? "",
      })),
    []
  );

  const officeLifeItems: OfficeLifeGalleryItem[] = useMemo(
    () =>
      eventGalleryItems.map((item) => ({
        id: item.id,
        src: item.src,
      })),
    []
  );

  const filteredItems = useMemo(() => {
    const items: Array<ProjectGalleryItem | OfficeLifeGalleryItem> =
      activeTab === "projects" ? projectItems : officeLifeItems;

    const validItems = items.filter((item) => item.src);
    const tabLimit = activeTab === "projects" ? 12 : limit;

    if (tabLimit) {
      return validItems.slice(0, tabLimit);
    }

    return validItems;
  }, [activeTab, limit, officeLifeItems, projectItems]);

  const officeLifeCover = officeLifeItems[0];

  return (
    <section className="md:pb-20 bg-background text-foreground relative overflow-hidden">
      {/* <div className="absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_top_left,hsla(var(--primary)/0.12),transparent_32%),radial-gradient(circle_at_bottom_right,hsla(var(--foreground)/0.06),transparent_28%)] pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-foreground/5 rounded-full blur-3xl pointer-events-none" /> */}

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="mb-8 flex justify-center">
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as GalleryTab)}
            className="w-full max-w-md"
          >
            <TabsList className="grid h-auto w-full grid-cols-2 rounded-full border border-border/70 bg-card/80 p-1.5 backdrop-blur-md shadow-sm">
              <TabsTrigger
                value="projects"
                className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Projects
              </TabsTrigger>
              <TabsTrigger
                value="office-life"
                className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Office Life
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {activeTab === "office-life" ? (
          <div className="flex justify-center">
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              onClick={() => setIsOfficeLifeOpen(true)}
              className="group relative w-full max-w-sm overflow-hidden rounded-[2rem] border border-border bg-card text-left shadow-lg shadow-black/10 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-primary/10"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-amber-200/25 via-background to-background" />
              <div className="absolute left-1/2 top-5 z-10 h-[44%] w-[72%] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/35 bg-background/95 shadow-xl shadow-black/20">
                {officeLifeCover ? (
                  <img
                    src={officeLifeCover.src}
                    alt={`Office life cover for ${officeLifeLocation}`}
                    className="h-full w-full object-contain bg-black/5 p-2"
                    loading="eager"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                    <ImageIcon className="h-8 w-8" />
                  </div>
                )}
              </div>
              <div className="absolute left-1/2 top-[calc(44%+1.5rem)] z-20 -translate-x-1/2 inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-background/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground shadow-sm backdrop-blur">
                <FolderOpen className="h-3.5 w-3.5 text-primary" />
                Office Life Folder
              </div>
              <div className="relative z-10 flex min-h-[390px] flex-col justify-end p-6 sm:p-7 pt-[18rem]">
                <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-background/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground shadow-sm backdrop-blur opacity-0">
                  <FolderOpen className="h-3.5 w-3.5 text-primary" />
                  Office Life Folder
                </div>
                <h2 className="max-w-[14ch] text-2xl sm:text-3xl font-display font-semibold tracking-tight text-foreground">
                  {officeLifeLocation} - {officeLifeDate}
                </h2>
                <p className="mt-3 max-w-xs text-sm sm:text-base text-muted-foreground">
                  Click to open the full office-life gallery.
                </p>
              </div>
            </motion.button>
          </div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-black/10 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-primary/10"
              >
                <img
                  src={item.src}
                  alt={"title" in item ? item.title : "Office life image"}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
                  loading="lazy"
                />
                {activeTab === "projects" && (
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <div className="inline-flex max-w-full rounded-full border border-primary/20 bg-background/85 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur-md shadow-sm">
                      <span className="truncate">
                        {"title" in item ? item.title : "Project"}
                      </span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "projects" && (
          <div className="mt-10 flex justify-center">
            <Link to="/portfolio">
              <Button
                size="lg"
                className="h-12 rounded-full bg-primary px-8 font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Click to explore more about project
              </Button>
            </Link>
          </div>
        )}
      </div>

      <Dialog open={isOfficeLifeOpen} onOpenChange={setIsOfficeLifeOpen}>
        <DialogContent className="max-w-7xl w-[95vw] p-0 overflow-hidden border-border/70 bg-background">
          <div className="flex max-h-[90vh] flex-col">
            <DialogHeader className="border-b border-border/60 px-5 py-4 text-left sm:px-6">
              <DialogTitle className="text-xl sm:text-2xl font-display font-semibold tracking-tight text-foreground">
                {officeLifeLocation} - {officeLifeDate}
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-2 overflow-y-auto gap-6 p-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {officeLifeItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.03 }}
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-card shadow-lg shadow-black/10"
                >
                  <img
                    src={item.src}
                    alt={`Office life image ${index + 1}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-3 text-xs font-medium text-white">
                    Image {index + 1}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
