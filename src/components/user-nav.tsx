"use client";

import Image from 'next/image'
import { Menu, Transition } from '@headlessui/react'
import { signOut, useSession } from 'next-auth/react';
import { Fragment } from 'react'
import Link from 'next/link';
import { LogOut, Ticket, Wand } from 'lucide-react';
import { cn } from '@/lib/utils';

export function UserNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { data: session, status } = useSession();
  const image = session?.user?.image ?? "";
  const name = session?.user?.name ?? "";

  if (status === "authenticated")  {
    return (
      <Menu as="div" className={cn("relative text-left", className)} {...props}>
        <Menu.Button className="btn md:btn-sm btn-neutral btn-circle overflow-hidden">
          <Image
            className="block"
            src={image}
            alt={name}
            width={64}
            height={64}
          />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute top-10 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="p-1 flex flex-col gap-1">
              <Menu.Item>
                <Link href="/pricing" className="btn bg-white !shadow-none !border-none">
                  <Ticket className="w-4 h-4" />
                  Buy Credits
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link href="/create" className="btn bg-white !shadow-none !border-none">
                  <Wand className="w-4 h-4" />
                  Create
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link href="/billing" className="btn bg-white !shadow-none !border-none">
                  <LogOut className="w-4 h-4" />
                  Billing
                </Link>
              </Menu.Item>
            </div>
            <div className="p-1 flex flex-col gap-1">
              <Menu.Item>
                <button onClick={() => signOut()} className="btn bg-white !shadow-none !border-none">
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    )
  }

  return null;
}
