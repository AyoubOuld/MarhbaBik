"use client";

import { Accordion } from "flowbite-react";

export function AccordionFAQ() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <Accordion>
          <Accordion.Panel>
            <Accordion.Title>
              How can I book accommodation through MarhbaBik?
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                Booking accommodation with MarhbaBik is easy! Simply browse our
                listings, select your desired location and dates, and choose
                from a variety of verified homes and apartments. Complete your
                booking securely through our platform to enjoy your stay with
                peace of mind.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
        <Accordion>
          <Accordion.Panel>
            <Accordion.Title>
              What types of vehicles can I rent using MarhbaBik?
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                MarhbaBik offers a wide range of vehicles for rent, including
                cars, SUVs, and even specialty vehicles for off-road adventures.
                Browse our options, select your preferred vehicle type, and book
                directly through our platform for convenient travel
                arrangements.
              </p>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
        <Accordion>
          <Accordion.Panel>
            <Accordion.Title>
              How can local hosts and travel agencies join MarhbaBik?
            </Accordion.Title>
            <Accordion.Content>
              <p className="mb-2 text-gray-500 dark:text-gray-400">
                We welcome local hosts and travel agencies to join MarhbaBik to
                showcase their properties and services. Simply visit our "Join
                Us" section, fill out the registration form, and our team will
                guide you through the verification process. Start connecting
                with travelers and showcasing the best of your region with
                MarhbaBik!
              </p>
            </Accordion.Content>
          </Accordion.Panel>
        </Accordion>
      </div>
    </>
  );
}
