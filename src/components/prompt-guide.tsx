"use client";

import Image from 'next/image'
import { Dialog, Transition } from '@headlessui/react'
import { X } from 'lucide-react';
import React, { Fragment, useState } from 'react'

export function PromptGuide({
  children
}: React.PropsWithChildren<{}>) {
  let [isOpen, setIsOpen] = useState<boolean>(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="inline-flex">
        <button
          type="button"
          onClick={openModal}
          className="link link-primary font-semibold"
        >
          See Prompt Tips
        </button>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-base-300 bg-opacity-60 backdrop-blur opacity-100" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden relative rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="div" className="flex items-center justify-between">
                    <h3 className="font-extrabold text-center w-full text-2xl">Prompt Guide</h3>
                  </Dialog.Title>
                  <button className="btn btn-square btn-sm text-slate-500 absolute right-4 top-4" onClick={closeModal}>
                    <X className="w-4 h-4" />
                  </button>
                  <div className="mt-2 space-y-2">
                    {children}
                  </div>

                  <div className="mt-4 text-center">
                    <button
                      type="button"
                      className="btn btn-neutral btn-sm text-white"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
