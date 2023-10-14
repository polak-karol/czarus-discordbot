import { SlashCommandBuilder } from '@discordjs/builders'

const slashCommands = [
  new SlashCommandBuilder().setName('ping').setDescription('Ping pong!'),
  new SlashCommandBuilder()
    .setName('birthdays')
    .setNameLocalizations({
      pl: 'urodziny',
    })
    .setDescription('Birthdays')
    .setDescriptionLocalizations({ pl: 'Urodziny' })
    .addSubcommand((subcommand) =>
      subcommand
        .setName('remember')
        .setNameLocalizations({ pl: 'zapamiętaj' })
        .setDescription('Tell Czaruś when your birthday is so that he can wish you well.')
        .setDescriptionLocalizations({
          pl: 'Napisz Czarkowi, kiedy masz urodziny, żeby mógł złożyć Ci życzenia.',
        })
        .addNumberOption((option) =>
          option
            .setName('day')
            .setNameLocalizations({ pl: 'dzień' })
            .setDescription('Day of birth.')
            .setDescriptionLocalizations({ pl: 'Dzień urodzin.' })
            .setMinValue(1)
            .setMaxValue(31)
            .setRequired(true),
        )
        .addNumberOption((option) =>
          option
            .setName('month')
            .setNameLocalizations({ pl: 'miesiąc' })
            .setDescription('Month of birth.')
            .setDescriptionLocalizations({ pl: 'Miesiąc urodzin.' })
            .setMinValue(1)
            .setMaxValue(12)
            .setRequired(true),
        )
        .addNumberOption((option) =>
          option
            .setName('year')
            .setNameLocalizations({ pl: 'rok' })
            .setDescription('Year of birth.')
            .setDescriptionLocalizations({ pl: 'Rok urodzin.' })
            .setMinValue(new Date().getFullYear() - 150)
            .setMaxValue(new Date().getFullYear()),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('forget')
        .setNameLocalizations({ pl: 'zapomnij' })
        .setDescription('Tell Czaruś to forget your birthday.')
        .setDescriptionLocalizations({
          pl: 'Powiedz Czarusiowi, żeby zapomniał o Twoich urodzinach.',
        }),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('when')
        .setNameLocalizations({ pl: 'kiedy' })
        .setDescription("Ask Charles when someone's birthday is.")
        .setDescriptionLocalizations({
          pl: 'Spytaj Czarusia kiedy są czyjeś urodziny.',
        })
        .addUserOption((option) =>
          option
            .setName('user')
            .setNameLocalizations({ pl: 'użytkownik' })
            .setDescription('Select any user from the server.')
            .setDescriptionLocalizations({
              pl: 'Wybierz dowolnego użytkownika z serwera.',
            })
            .setRequired(true),
        ),
    ),
  new SlashCommandBuilder()
    .setName('duck')
    .setNameLocalizations({ pl: 'kaczka' })
    .setDescription('Quack quack!')
    .setDescriptionLocalizations({ pl: 'Kwa kwa!' }),
  new SlashCommandBuilder()
    .setName('ktowygra')
    .setDescription('BETA')
    .addUserOption((option) =>
      option.setName('uzytkownik1').setDescription('Dowolny użytkownik serwera.').setRequired(true),
    )
    .addUserOption((option) =>
      option.setName('uzytkownik2').setDescription('Dowolny użytkownik serwera.').setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('wasted')
    .setDescription('BETA')
    .addUserOption((option) =>
      option.setName('uzytkownik').setDescription('Dowolny użytkownik serwera.').setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('poszukiwany')
    .setDescription('BETA')
    .addUserOption((option) =>
      option.setName('uzytkownik').setDescription('Dowolny użytkownik serwera.').setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('tobecontinued')
    .setDescription('BETA')
    .addUserOption((option) =>
      option.setName('uzytkownik').setDescription('Dowolny użytkownik serwera.').setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('snajper')
    .setDescription('BETA')
    .addUserOption((option) =>
      option.setName('uzytkownik').setDescription('Dowolny użytkownik serwera.').setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('straszny')
    .setDescription('BETA')
    .addUserOption((option) =>
      option.setName('uzytkownik').setDescription('Dowolny użytkownik serwera.').setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('rip')
    .setDescription('BETA')
    .addUserOption((option) =>
      option.setName('uzytkownik').setDescription('Dowolny użytkownik serwera.').setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('odrzuc')
    .setDescription('BETA')
    .addUserOption((option) =>
      option.setName('uzytkownik').setDescription('Dowolny użytkownik serwera.').setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('wasik')
    .setDescription('BETA')
    .addUserOption((option) =>
      option.setName('uzytkownik').setDescription('Dowolny użytkownik serwera.').setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('missionpassed')
    .setDescription('BETA')
    .addUserOption((option) =>
      option.setName('uzytkownik').setDescription('Dowolny użytkownik serwera.').setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('wiezienie')
    .setDescription('BETA')
    .addUserOption((option) =>
      option.setName('uzytkownik').setDescription('Dowolny użytkownik serwera.').setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('ogien')
    .setDescription('BETA')
    .addUserOption((option) =>
      option.setName('uzytkownik').setDescription('Dowolny użytkownik serwera.').setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('dyktator')
    .setDescription('BETA')
    .addUserOption((option) =>
      option.setName('uzytkownik').setDescription('Dowolny użytkownik serwera.').setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('spal')
    .setDescription('BETA')
    .addUserOption((option) =>
      option.setName('uzytkownik').setDescription('Dowolny użytkownik serwera.').setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('piekny')
    .setDescription('BETA')
    .addUserOption((option) =>
      option.setName('uzytkownik').setDescription('Dowolny użytkownik serwera.').setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('plaskacz')
    .setDescription('BETA')
    .addUserOption((option) =>
      option.setName('uzytkownik1').setDescription('Dowolny użytkownik serwera.').setRequired(true),
    )
    .addUserOption((option) =>
      option.setName('uzytkownik2').setDescription('Dowolny użytkownik serwera.').setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('fuzja')
    .setDescription('BETA')
    .addUserOption((option) =>
      option.setName('uzytkownik1').setDescription('Dowolny użytkownik serwera.').setRequired(true),
    )
    .addUserOption((option) =>
      option.setName('uzytkownik2').setDescription('Dowolny użytkownik serwera.').setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('potwierdz')
    .setDescription('BETA')
    .addUserOption((option) =>
      option.setName('uzytkownik').setDescription('Dowolny użytkownik serwera.').setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('3000years')
    .setDescription('BETA')
    .addUserOption((option) =>
      option.setName('uzytkownik').setDescription('Dowolny użytkownik serwera').setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('crush')
    .setDescription('BETA')
    .addUserOption((option) =>
      option.setName('uzytkownik').setDescription('Dowolny użytkownik serwera').setRequired(true),
    ),
  new SlashCommandBuilder()
    .setName('draw')
    .setNameLocalizations({ pl: 'losuj' })
    .setDescription('Draw a challenge.')
    .setDescriptionLocalizations({ pl: 'Wylosuj jakieś wyzwanie.' })
    .addSubcommand((subcommand) =>
      subcommand
        .setName('music_challenge')
        .setNameLocalizations({ pl: 'wyzwanie_muzyczne' })
        .setDescription('Losuje wybrane kategorie do wyzwania muzycznego.')
        .setDescriptionLocalizations({
          pl: 'Losuje wybrane kategorie do wyzwania muzycznego.',
        })
        .addStringOption((option) =>
          option
            .setName('rate')
            .setNameLocalizations({ pl: 'tempo' })
            .setDescription('Do you want to draw a pace?')
            .setDescriptionLocalizations({ pl: 'Czy chcesz wylosować tempo?' })
            .addChoices(
              {
                name: 'Yes',
                name_localizations: { pl: 'Tak' },
                value: 'true',
              },
              { name: 'No', name_localizations: { pl: 'Nie' }, value: 'false' },
            ),
        )
        .addStringOption((option) =>
          option
            .setName('rhythm')
            .setNameLocalizations({ pl: 'rytm' })
            .setDescription('Czy chcesz wylosować rytm utworu?')
            .setDescriptionLocalizations({
              pl: 'Czy chcesz wylosować rytm utworu?',
            })
            .addChoices(
              { name: 'Yes', name_localizations: { pl: 'Tak' }, value: 'true' },
              { name: 'No', name_localizations: { pl: 'Nie' }, value: 'false' },
            ),
        )
        .addStringOption((option) =>
          option
            .setName('key')
            .setNameLocalizations({ pl: 'tonacja' })
            .setDescription('Do you want to draw the main key?')
            .setDescriptionLocalizations({
              pl: 'Czy chcesz wylosować tonację przewodnią?',
            })
            .addChoices(
              { name: 'Yes', name_localizations: { pl: 'Tak' }, value: 'true' },
              { name: 'No', name_localizations: { pl: 'Nie' }, value: 'false' },
            ),
        )
        .addStringOption((option) =>
          option
            .setName('required_key')
            .setNameLocalizations({ pl: 'wymagany_klawisz' })
            .setDescription('Do you want to draw a required key in a song?')
            .setDescriptionLocalizations({
              pl: 'Czy chcesz wylosować wymagany klawisz w utworze?',
            })
            .addChoices(
              { name: 'Yes', name_localizations: { pl: 'Tak' }, value: 'true' },
              { name: 'No', name_localizations: { pl: 'Nie' }, value: 'false' },
            ),
        )
        .addStringOption((option) =>
          option
            .setName('forbidden_key')
            .setNameLocalizations({ pl: 'zakazany_klawisz' })
            .setDescription('Do you want to draw a key that cannot be included in the song?')
            .setDescriptionLocalizations({
              pl: 'Czy chcesz wylosować klawisz, który nie może znaleźć się w utworze?',
            })
            .addChoices(
              { name: 'Yes', name_localizations: { pl: 'Tak' }, value: 'true' },
              { name: 'No', name_localizations: { pl: 'Nie' }, value: 'false' },
            ),
        )
        .addStringOption((option) =>
          option
            .setName('required_instrument')
            .setNameLocalizations({ pl: 'wymagany_instrument' })
            .setDescription('Do you want to draw an instrument that must be used?')
            .setDescriptionLocalizations({
              pl: 'Czy chcesz wylosować instrument, które musi zostać użyty?',
            })
            .addChoices(
              { name: 'Yes', name_localizations: { pl: 'Tak' }, value: 'true' },
              { name: 'No', name_localizations: { pl: 'Nie' }, value: 'false' },
            ),
        )
        .addStringOption((option) =>
          option
            .setName('forbidden_instrument')
            .setNameLocalizations({ pl: 'zakazany_instrument' })
            .setDescription('Do you want to draw a forbidden instrument for the song?')
            .setDescriptionLocalizations({
              pl: 'Czy chcesz wylosować zakazany instrument do utworu?',
            })
            .addChoices(
              { name: 'Yes', name_localizations: { pl: 'Tak' }, value: 'true' },
              { name: 'No', name_localizations: { pl: 'Nie' }, value: 'false' },
            ),
        )
        .addStringOption((option) =>
          option
            .setName('genre')
            .setNameLocalizations({ pl: 'gatunek' })
            .setDescription('Do you want to draw a genre?')
            .setDescriptionLocalizations({
              pl: 'Czy chcesz wylosować gatunek?',
            })
            .addChoices(
              { name: 'Yes', name_localizations: { pl: 'Tak' }, value: 'true' },
              { name: 'No', name_localizations: { pl: 'Nie' }, value: 'false' },
            ),
        )
        .addStringOption((option) =>
          option
            .setName('mood')
            .setNameLocalizations({ pl: 'nastrój' })
            .setDescription('Do you want to draw a mood?')
            .setDescriptionLocalizations({
              pl: 'Czy chcesz wylosować nastrój?',
            })
            .addChoices(
              { name: 'Yes', name_localizations: { pl: 'Tak' }, value: 'true' },
              { name: 'No', name_localizations: { pl: 'Nie' }, value: 'false' },
            ),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName('writing_challenge')
        .setNameLocalizations({ pl: 'wyzwanie_pisarskie' })
        .setDescription('Draw categories for the writing challenge.')
        .setDescriptionLocalizations({
          pl: 'Losuj wybrane kategorie do wyzwania pisarskiego.',
        })
        .addStringOption((option) =>
          option
            .setName('genre')
            .setNameLocalizations({ pl: 'gatunek' })
            .setDescription('Would you like to draw a species for the challenge?')
            .setDescriptionLocalizations({
              pl: 'Czy chcesz wylosować gatunek do wyzwania?',
            })
            .addChoices(
              { name: 'Yes', name_localizations: { pl: 'Tak' }, value: 'true' },
              { name: 'No', name_localizations: { pl: 'Nie' }, value: 'false' },
            ),
        )
        .addStringOption((option) =>
          option
            .setName('narration')
            .setNameLocalizations({ pl: 'narracja' })
            .setDescription('Do you want to draw a narration?')
            .setDescriptionLocalizations({
              pl: 'Czy chcesz wylosować narrację?',
            })
            .addChoices(
              { name: 'Yes', name_localizations: { pl: 'Tak' }, value: 'true' },
              { name: 'No', name_localizations: { pl: 'Nie' }, value: 'false' },
            ),
        )
        .addStringOption((option) =>
          option
            .setName('theme')
            .setNameLocalizations({ pl: 'temat' })
            .setDescription('Do you want to draw a theme?')
            .setDescriptionLocalizations({
              pl: 'Czy chcesz wylosować temat przewodni?',
            })
            .addChoices(
              { name: 'Yes', name_localizations: { pl: 'Tak' }, value: 'true' },
              { name: 'No', name_localizations: { pl: 'Nie' }, value: 'false' },
            ),
        )
        .addStringOption((option) =>
          option
            .setName('words_range')
            .setNameLocalizations({ pl: 'zakres_słów' })
            .setDescription('Do you want to draw a required range of words?')
            .setDescriptionLocalizations({
              pl: 'Czy chcesz wylosować wymagany zakres słów?',
            })
            .addChoices(
              { name: 'Yes', name_localizations: { pl: 'Tak' }, value: 'true' },
              { name: 'No', name_localizations: { pl: 'Nie' }, value: 'false' },
            ),
        )
        .addStringOption((option) =>
          option
            .setName('required_word')
            .setNameLocalizations({ pl: 'wymagane_słowo' })
            .setDescription('Do you want to draw a required word?')
            .setDescriptionLocalizations({
              pl: 'Czy chcesz wylosować wymagane słowo?',
            })
            .addChoices(
              { name: 'Yes', name_localizations: { pl: 'Tak' }, value: 'true' },
              { name: 'No', name_localizations: { pl: 'Nie' }, value: 'false' },
            ),
        )
        .addStringOption((option) =>
          option
            .setName('forbidden_word')
            .setNameLocalizations({ pl: 'zabronione_słowo' })
            .setDescription('Do you want to draw a forbidden word?')
            .setDescriptionLocalizations({
              pl: 'Czy chcesz wylosować zakazane słowo?',
            })
            .addChoices(
              { name: 'Yes', name_localizations: { pl: 'Tak' }, value: 'true' },
              { name: 'No', name_localizations: { pl: 'Nie' }, value: 'false' },
            ),
        )
        .addStringOption((option) =>
          option
            .setName('character')
            .setNameLocalizations({ pl: 'postać' })
            .setDescription('Would you like to draw a character?')
            .setDescriptionLocalizations({
              pl: 'Czy chcesz wylosować postać?',
            })
            .addChoices(
              { name: 'Yes', name_localizations: { pl: 'Tak' }, value: 'true' },
              { name: 'No', name_localizations: { pl: 'Nie' }, value: 'false' },
            ),
        )
        .addStringOption((option) =>
          option
            .setName('place')
            .setNameLocalizations({ pl: 'miejsce' })
            .setDescription('Do you want to draw where the action takes place?')
            .setDescriptionLocalizations({
              pl: 'Czy chcesz wylosować miejsce rozgrywania się akcji?',
            })
            .addChoices(
              { name: 'Yes', name_localizations: { pl: 'Tak' }, value: 'true' },
              { name: 'No', name_localizations: { pl: 'Nie' }, value: 'false' },
            ),
        ),
    ),
].map((command) => command.toJSON())

export default slashCommands
