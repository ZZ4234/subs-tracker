"use client"

const SaveMoneyPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Save Money Smartly</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Subscription Management</h2>
        <p className="mb-4">
          Many of us unknowingly waste money on subscriptions we no longer use or need. Taking control of your
          subscriptions is a simple yet effective way to save money.
        </p>

        <ul className="list-disc list-inside">
          <li>
            <b>Audit Your Subscriptions:</b> Review your bank statements and credit card bills to identify all recurring
            charges.
          </li>
          <li>
            <b>Categorize Subscriptions:</b> Group your subscriptions into essential, nice-to-have, and unnecessary
            categories.
          </li>
          <li>
            <b>Cancel Unnecessary Subscriptions:</b> Be ruthless! Cancel any subscriptions you rarely use or don't
            provide significant value.
          </li>
          <li>
            <b>Negotiate or Downgrade:</b> Contact providers to negotiate lower rates or downgrade to cheaper plans.
          </li>
          <li>
            <b>Set Renewal Reminders:</b> Use calendar reminders to review subscriptions before they automatically
            renew.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Practical Money-Saving Tips</h2>
        <ul className="list-disc list-inside">
          <li>
            <b>Create a Budget:</b> Track your income and expenses to identify areas where you can cut back.
          </li>
          <li>
            <b>Cook at Home:</b> Eating out frequently can be expensive. Plan your meals and cook at home more often.
          </li>
          <li>
            <b>Reduce Food Waste:</b> Plan your meals, store food properly, and use leftovers creatively.
          </li>
          <li>
            <b>Shop Around for Insurance:</b> Compare quotes from different insurance providers to find the best rates.
          </li>
          <li>
            <b>Use Energy Efficiently:</b> Turn off lights when you leave a room, unplug electronics when not in use,
            and consider energy-efficient appliances.
          </li>
          <li>
            <b>Take Advantage of Free Activities:</b> Explore free activities in your community, such as parks, museums,
            and libraries.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Automate Your Savings</h2>
        <p className="mb-4">
          Set up automatic transfers from your checking account to your savings account each month. Even small amounts
          can add up over time.
        </p>
      </section>
    </div>
  )
}

export default SaveMoneyPage
