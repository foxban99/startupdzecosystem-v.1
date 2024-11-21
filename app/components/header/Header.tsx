import { useStore } from '@nanostores/react';
import { ClientOnly } from 'remix-utils/client-only';
import { chatStore } from '~/lib/stores/chat';
import { classNames } from '~/utils/classNames';
import { HeaderActionButtons } from './HeaderActionButtons.client';
import { ChatDescription } from '~/lib/persistence/ChatDescription.client';

export function Header() {
  const chat = useStore(chatStore);

  return (
    <header
      className={classNames(
        'flex items-center justify-center bg-bolt-elements-background-depth-1 p-5 border-b h-[var(--header-height)]',
        {
          'border-transparent': !chat.started,
          'border-bolt-elements-borderColor': chat.started,
        },
      )}
    >
      <div className="flex items-center gap-2 text-bolt-elements-textPrimary cursor-pointer">
        {/* قم بإزالة أو تعليق السطر التالي للتخلص من الأيقونة */}
        {/* <div className="i-ph:sidebar-simple-duotone text-xl" /> */}
        <a href="/" className="text-2xl font-semibold flex items-center">
        <span className="font-bold text-2xl text-white">startup</span>
        <span className="font-bold text-2xl text-green-600">dz</span>
        <span className="font-bold text-2xl text-red-600">copilot</span>
        </a>
      </div>

      {chat.started && (
        <ClientOnly>
          {() => (
            <div className="ml-auto mr-1">
              <HeaderActionButtons />
            </div>
          )}
        </ClientOnly>
      )}
    </header>
  );
}
