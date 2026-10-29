import React from 'react';
import { Bookmark as BookmarkType } from '../types/browser';
import { Globe, Plus } from 'lucide-react';

interface BookmarksBarProps {
  bookmarks: BookmarkType[];
  onSelectBookmark: (url: string) => void;
  onOpenGmailDrawer: () => void;
  onOpenDefaultModal: () => void;
}

export const BookmarksBar: React.FC<BookmarksBarProps> = ({
  bookmarks,
  onSelectBookmark,
  onOpenGmailDrawer,
  onOpenDefaultModal,
}) => {
  return (
    <div className="bg-slate-950/70 border-b border-slate-800/80 px-3 py-1 flex items-center gap-1.5 text-xs text-slate-300 select-none overflow-x-auto scrollbar-none h-7">
      {/* Pre-installed Quick Bookmarks */}
      <button
        onClick={onOpenGmailDrawer}
        className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-slate-800/80 text-red-300 font-medium shrink-0 transition-colors"
      >
        <span className="w-2 h-2 rounded-full bg-red-500" />
        <span>Gmail Inbox</span>
      </button>

      <button
        onClick={onOpenDefaultModal}
        className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-slate-800/80 text-amber-300 font-medium shrink-0 transition-colors"
      >
        <span className="w-2 h-2 rounded-full bg-amber-400" />
        <span>Configurar Predeterminado</span>
      </button>

      <span className="w-px h-3.5 bg-slate-800 mx-1 shrink-0" />

      {/* User Bookmarks */}
      {bookmarks.map((b) => (
        <button
          key={b.id}
          onClick={() => onSelectBookmark(b.url)}
          className="flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white shrink-0 transition-colors max-w-[160px] truncate"
          title={b.url}
        >
          {b.icon ? (
            <img src={b.icon} alt="" className="w-3.5 h-3.5 rounded-xs shrink-0 object-contain" />
          ) : (
            <Globe className="w-3 h-3 text-sky-400 shrink-0" />
          )}
          <span className="truncate">{b.title}</span>
        </button>
      ))}
    </div>
  );
};
