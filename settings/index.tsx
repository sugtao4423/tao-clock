function dateFormatSettings(props) {
  return (
    <Page>
      <Select
        label="Date Format"
        settingsKey="dateFormat"
        options={[
          { name: 'yyyy/MM/dd E' },
          { name: 'E, MM/dd/yyyy' },
          { name: 'E, dd/MM/yyyy' },
          { name: 'E, dd MM月 yyyy' },
        ]}
      />
    </Page>
  )
}

registerSettingsPage(dateFormatSettings)
