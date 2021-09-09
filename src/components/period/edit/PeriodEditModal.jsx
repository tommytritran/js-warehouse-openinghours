import React, { Fragment, useState, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { PencilAltIcon, TrashIcon, XIcon } from '@heroicons/react/outline';
import PeriodEdit from './PeriodEdit';
import { deletePeriod, updatePeriod } from '../../../service/PeriodService';
import { validatePeriod } from '../../../Util/Validation/FormValidation';

export default function PeriodEditModal({
  period, toggleEdit, refreshPeriodList,
}) {
  const initialFocusRef = useRef(null);
  const [editedPeriod, setEditedPeriod] = useState({});

  function saveEdit() {
    const errors = validatePeriod(period);
    if (errors.length > 0) {
      console.log(errors);
      // todo handle errors
    } else {
      toggleEdit(false);
      updatePeriod(editedPeriod);
      refreshPeriodList();
    }
  }
  function editPeriodHandler(data) {
    setEditedPeriod(data);
  }
  function deletePeriodHandler() {
    deletePeriod(period.id);
    toggleEdit(false);
    refreshPeriodList();
  }
  return (
    <Transition.Root show as={Fragment}>
      <Dialog
        as="div"
        auto-reopen="true"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={toggleEdit}
        initialFocus={initialFocusRef}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                    <PencilAltIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 sm:mt-0">
                    <div className="flex justify-between items-center xs:flex-col sm:flex-row">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 sm:ml-4">
                        {`Edit - ${period.warehouse}`}
                      </h3>
                      <button
                        type="button"
                        className="btn-delete xs:mt-2 sm:mt-0"
                        onClick={() => deletePeriodHandler()}
                      >
                        <TrashIcon className="h-4 w-4 mr-2" />
                        Delete
                      </button>
                    </div>
                    <div className="mt-2">
                      <PeriodEdit
                        period={period}
                        handler={editPeriodHandler}
                        initialFocusRef={initialFocusRef}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="btn-accept"
                  onClick={() => saveEdit()}
                >
                  <PencilAltIcon className="w-4 h-4 mr-2" />
                  Update
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => toggleEdit(false)}
                >
                  <XIcon className="h-4 w-4 mr-2" />
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
